// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 3000;

// Simple question pool (you can replace with DB)
const QUESTION_POOL = [
  {
    id: 1,
    text: "What tag wraps self-contained content?",
    options: ["<div>", "<article>", "<span>", "<section>"],
    answerIndex: 1,
  },
  {
    id: 2,
    text: "What is HTML for?",
    options: ["Style", "Structure", "Logic", "Database"],
    answerIndex: 1,
  },
  {
    id: 3,
    text: "Which is correct to make a link?",
    options: ['<a href="...">', "<link>", "<href>", "<script>"],
    answerIndex: 0,
  },
  {
    id: 4,
    text: "CSS stands for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Computer Style Sheet",
      "Cascading Script Sheets",
    ],
    answerIndex: 0,
  },
  // add more...
];

function pickRandomQuestions(count = 5) {
  const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Room state store (in-memory)
const rooms = {}; // roomId -> { players: Map(socketId->player), questions, state, answers, startTime, timerId }

io.on("connection", (socket) => {
  console.log("conn:", socket.id);

  // create room
  socket.on("create_room", ({ roomId, user }) => {
    if (!roomId || !user) return;

    // create new room
    rooms[roomId] = {
      host: socket.id,
      players: new Map(),
      questions: pickRandomQuestions(5),
      state: "waiting",
      startTime: null,
      currentIndex: 0,
      answers: {},
    };

    // add host player
    rooms[roomId].players.set(socket.id, {
      socketId: socket.id,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      score: 0,
      hp: 3,
      ready: true, // <-- tambah
    });

    socket.join(roomId);

    io.to(roomId).emit("room_update", roomSummary(roomId));

    socket.emit("room_created", { roomId, user });
  });

  // JOIN ROOM
  socket.on("join_room", ({ roomId, user }) => {
    const room = rooms[roomId];
    if (!room) return;
    room.players.set(socket.id, {
      socketId: socket.id,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      score: 0,
      hp: 3,
      ready: socket.id === room.host ? true : false, // <-- tambah ini
    });

    socket.join(roomId);
    io.to(roomId).emit("room_update", roomSummary(roomId));
  });

  // start battle (by host)
  // start battle (by host) — terima acknowledgement callback (ack)
  socket.on("start_battle", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    // hanya host yang bisa mulai
    if (socket.id !== room.host) {
      socket.emit("error_msg", "Only host can start");
      return;
    }

    // CEK: minimal 2 pemain
    const playerCount = room.players.size;
    if (playerCount === 1) {
      socket.emit("error_msg", "Pemain kurang dari 2!");
      return;
    }

    // CEK: semua pemain harus ready
    const allReady = [...room.players.values()].every((p) => p.ready === true);
    if (!allReady) {
      socket.emit("error_msg", "Semua pemain harus ready!");
      return;
    }

    // mulai battle 3 detik lagi
    room.state = "starting";
    const startTime = Date.now() + 3000;
    room.startTime = startTime;

    io.to(roomId).emit("battle_starting", { startTime });

    setTimeout(() => {
      room.state = "in_progress";
      emitQuestion(roomId);
    }, 3000);
  });

  // handle answer submission (anti-cheat: first responder per question wins points)
  socket.on("submit_answer", ({ roomId, questionId, answerIndex }) => {
    const room = rooms[roomId];
    if (!room || room.state !== "in_progress") return;
    const player = room.players.get(socket.id);
    if (!player) return;

    const key = `${questionId}`;
    if (!room.answers[key]) {
      // first submission for this question
      const question = room.questions.find((q) => q.id === questionId);
      const correct = question && question.answerIndex === answerIndex;
      room.answers[key] = {
        firstResponderId: socket.id,
        firstAnswerIndex: answerIndex,
        isCorrect: correct,
      };

      // scoring: first correct +2, first incorrect -1 hp
      if (correct) {
        player.score = (player.score || 0) + 2;
      } else {
        player.hp = Math.max((player.hp || 0) - 1, 0);
      }

      io.to(roomId).emit("answer_result", {
        questionId,
        firstResponder: { id: socket.id, name: player.name },
        isCorrect: correct,
        answerIndex,
      });

      if (room.currentQuestionTimeout) {
        clearTimeout(room.currentQuestionTimeout);
        room.currentQuestionTimeout = null;
      }
      moveToNextQuestion(roomId);
      // check end condition
      checkRoomEnd(roomId);
    } else {
      // subsequent answers ignored by server (anti-cheat)
      socket.emit("answer_ignored", {
        reason: "Already answered by another player",
      });
    }
  });

  // leave
  socket.on("leave_room", ({ roomId }) => {
    leaveRoom(socket, roomId);
  });

  socket.on("disconnect", () => {
    // remove from all rooms
    for (const roomId of Object.keys(rooms)) {
      if (rooms[roomId].players.has(socket.id)) {
        leaveRoom(socket, roomId);
      }
    }
  });
  socket.on("player_ready", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.get(socket.id);
    if (!player) return;

    player.ready = true;
    io.to(roomId).emit("room_update", roomSummary(roomId));
  });
});

function roomSummary(roomId) {
  const room = rooms[roomId];
  if (!room) return null;
  const players = Array.from(room.players.values()).map((p) => ({
    id: p.id || p.socketId,
    name: p.name,
    score: p.score,
    hp: p.hp,
    avatar: p.avatar, // pastikan avatar dikirim
    ready: p.ready,
  }));
  return {
    roomId,
    players,
    state: room.state,
    host: room.host,
    totalQuestions: room.questions.length,
  };
}

function emitQuestion(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  const idx = room.currentIndex;
  if (idx >= room.questions.length) {
    endBattle(roomId);
    return;
  }
  const q = room.questions[idx];
  io.to(roomId).emit("new_question", {
    question: { id: q.id, text: q.text, options: q.options },
    index: idx,
  });
  // auto move to next question after 10s (room auto-advance)
  // room.currentQuestionTimeout = setTimeout(() => {
  //   moveToNextQuestion(roomId);
  // }, 10000);
}

function moveToNextQuestion(roomId) {
  const room = rooms[roomId];
  if (!room) return;

  const idx = room.currentIndex;
  const q = room.questions[idx];

  // jika tidak ada jawaban sama sekali, catat sebagai none
  if (!room.answers[q.id]) {
    room.answers[q.id] = { firstResponderId: null, isCorrect: false };
  }

  room.currentIndex++;

  if (room.currentIndex < room.questions.length) {
    emitQuestion(roomId);
  } else {
    endBattle(roomId);
  }
}

function endBattle(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  room.state = "ended";
  // prepare leaderboard
  const leaderboard = Array.from(room.players.values())
    .map((p) => ({
      id: p.socketId,
      name: p.name,
      score: p.score || 0,
      hp: p.hp || 0,
    }))
    .sort((a, b) => b.score - a.score);
  io.to(roomId).emit("battle_ended", { leaderboard });
  // auto close room in 15s
  setTimeout(() => {
    closeRoom(roomId);
  }, 15000);
}

function checkRoomEnd(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  // simple end: if all players hp = 0 or questions finished
  const playersAlive = Array.from(room.players.values()).some((p) => p.hp > 0);
  if (!playersAlive) {
    endBattle(roomId);
  }
}

function closeRoom(roomId) {
  const room = rooms[roomId];
  if (!room) return;
  io.to(roomId).emit("room_closed");
  // force leave sockets
  for (const socketId of room.players.keys()) {
    const s = io.sockets.sockets.get(socketId);
    if (s) s.leave(roomId);
  }
  delete rooms[roomId];
  console.log("room closed", roomId);
}

function leaveRoom(socket, roomId) {
  const room = rooms[roomId];
  if (!room) return;
  room.players.delete(socket.id);
  socket.leave(roomId);
  io.to(roomId).emit("room_update", roomSummary(roomId));
  // if no players left close room
  if (room.players.size === 0) {
    closeRoom(roomId);
  } else if (socket.id === room.host) {
    // assign new host
    const nextHost = room.players.keys().next().value;
    room.host = nextHost;
  }
}

app.get("/", (req, res) => res.send("Battle server up"));
server.listen(PORT, () => console.log("Server listening", PORT));
