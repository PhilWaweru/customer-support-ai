"use client";
import { Box, Stack } from "@mui/material"; // Importing Box and Stack from Material-UI
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi I'm the PhiliusAI support Agent, how can I assist you today?",
    },
    // Add more initial messages if needed
  ]);

  const [message, setMessage] = useState("");

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: '600px',
          height: '700px',
          border: '1px solid black',
          p: 2,
          spacing: 2,
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          sx={{
            maxHeight: '100%',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={message.role === "assistant" ? "primary.main" : "secondary.main"}
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
