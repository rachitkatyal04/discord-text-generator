"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Textarea,
  Paper,
  CopyButton,
  Button,
  Stack,
  Group,
  Divider,
  Box,
  Tabs,
  Code,
  Alert,
} from "@mantine/core";

// Colors for ANSI method
const methodColors = {
  ansi: {
    red: "#f04747",
    green: "#43b581",
    yellow: "#faa61a",
    blue: "#00b0f4",
    magenta: "#f47fff",
    cyan: "#00e5ff",
  },
};

export default function Home() {
  const [inputText, setInputText] = useState("Hello Discord!");
  const [currentColor, setCurrentColor] = useState("");
  const [currentBgColor, setCurrentBgColor] = useState(""); // Empty means no background
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize activeTab from localStorage if available, otherwise use "generator"
  const [activeTab, setActiveTab] = useState("generator");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
    setIsLoading(false);
  }, []);

  // Save active tab to localStorage when it changes
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      localStorage.setItem("activeTab", value);
    }
  };

  if (isLoading) {
    return null; 
  }

  // Generate the Discord markdown code
  const generateDiscordCode = () => {
    const ansiColorMap: Record<string, string> = {
      [methodColors.ansi.red]: "1;31",
      [methodColors.ansi.green]: "1;32",
      [methodColors.ansi.yellow]: "1;33",
      [methodColors.ansi.blue]: "1;34",
      [methodColors.ansi.magenta]: "1;35",
      [methodColors.ansi.cyan]: "1;36",
    };

    const ansiBgColorMap: Record<string, string> = {
      [methodColors.ansi.red]: "41",
      [methodColors.ansi.green]: "42",
      [methodColors.ansi.yellow]: "43",
      [methodColors.ansi.blue]: "44",
      [methodColors.ansi.magenta]: "45",
      [methodColors.ansi.cyan]: "46",
    };

    // Use white (37) if no color selected
    const colorCode = currentColor ? ansiColorMap[currentColor] : "1;37";
    const bgCode = currentBgColor ? ansiBgColorMap[currentBgColor] : "";
    const codes = bgCode ? `${colorCode};${bgCode}` : colorCode;

    return `\`\`\`ansi
\u001b[${codes}m${inputText}\u001b[0m
\`\`\``;
  };

  return (
    <>
      <Container size="md" py="xl">
        <Title order={1} ta="center" mb="lg">
          Discord Text Generator
        </Title>
        <Text ta="center" color="dimmed" mb="xl">
          Create colored text for Discord using markdown code blocks
        </Text>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="generator">Generator</Tabs.Tab>
            <Tabs.Tab value="about">About</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="generator" pt="md">
            <Stack gap="md">
              <Box mb="md">
                <Text fw={700} size="lg" mb={15}>
                  ANSI Colors
                </Text>
                <Text fw={500} size="sm" mb={5}>
                  Text Color
                </Text>
                <Group>
                  <Button
                    variant={currentColor === "" ? "filled" : "light"}
                    onClick={() => setCurrentColor("")}
                    styles={(theme) => ({
                      root: {
                        backgroundColor:
                          currentColor === "" ? "#ffffff" : "#36393f",
                        color: currentColor === "" ? "#000000" : "#ffffff",
                        border: "1px solid #ffffff",
                        '&:hover': {
                          backgroundColor: "#ffffff",
                          color: "#000000",
                        }
                      },
                    })}
                  >
                    None (White)
                  </Button>
                  {Object.entries(methodColors.ansi).map(
                    ([name, color]: [string, string]) => (
                      <Button
                        key={name}
                        variant={currentColor === color ? "filled" : "light"}
                        onClick={() => setCurrentColor(color)}
                        styles={(theme) => ({
                          root: {
                            backgroundColor:
                              currentColor === color ? color : "#36393f",
                            color: currentColor === color ? "#ffffff" : color,
                            border: `1px solid ${color}`,
                            '&:hover': {
                              backgroundColor: color,
                              color: "#ffffff",
                            }
                          },
                        })}
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Button>
                    )
                  )}
                </Group>
              </Box>

              <Box mb="md">
                <Text fw={500} size="sm" mb={5}>
                  Background Color
                </Text>
                <Group>
                  <Button
                    variant={currentBgColor === "" ? "filled" : "light"}
                    onClick={() => setCurrentBgColor("")}
                    styles={(theme) => ({
                      root: {
                        backgroundColor:
                          currentBgColor === "" ? "#ffffff" : "#36393f",
                        color: currentBgColor === "" ? "#000000" : "#ffffff",
                        border: "1px solid #ffffff",
                        '&:hover': {
                          backgroundColor: "#ffffff",
                          color: "#000000",
                        }
                      },
                    })}
                  >
                    None (White)
                  </Button>
                  {Object.entries(methodColors.ansi).map(
                    ([name, color]: [string, string]) => (
                      <Button
                        key={name}
                        variant={currentBgColor === color ? "filled" : "light"}
                        onClick={() => setCurrentBgColor(color)}
                        styles={(theme) => ({
                          root: {
                            backgroundColor:
                              currentBgColor === color ? color : "#36393f",
                            color: currentBgColor === color ? "#ffffff" : color,
                            border: `1px solid ${color}`,
                            '&:hover': {
                              backgroundColor: color,
                              color: "#ffffff",
                            }
                          },
                        })}
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Button>
                    )
                  )}
                </Group>
              </Box>

              <Textarea
                label="Your Text"
                description="Enter the text you want to color"
                placeholder="Type your message here..."
                minRows={3}
                value={inputText}
                onChange={(event) => setInputText(event.currentTarget.value)}
                styles={{
                  input: {
                    color: "inherit",
                    padding: "10px",
                  },
                }}
              />

              <Divider label="Preview" labelPosition="center" />
              <Paper
                p="md"
                style={{
                  backgroundColor: currentBgColor || "#ffffff",
                  overflow: "auto",
                  border: !currentBgColor ? "1px solid #cccccc" : "none",
                }}
              >
                <Box
                  style={{
                    fontFamily: "monospace",
                    color: currentColor || "#000000",
                    whiteSpace: "pre-wrap",
                    padding: "10px",
                  }}
                >
                  {inputText}
                </Box>
              </Paper>

              <Divider label="Discord Code" labelPosition="center" />

              <Paper p="md" withBorder>
                <Code block style={{ whiteSpace: "pre-wrap" }}>
                  {generateDiscordCode()}
                </Code>
              </Paper>

              <Group justify="center" mt="md">
                <CopyButton value={inputText}>
                  {({ copied, copy }) => (
                    <Button color={copied ? "teal" : "blue"} onClick={copy}>
                      {copied ? "Copied!" : "Copy Text Only"}
                    </Button>
                  )}
                </CopyButton>
                <CopyButton value={generateDiscordCode()}>
                  {({ copied, copy }) => (
                    <Button color={copied ? "teal" : "violet"} onClick={copy}>
                      {copied ? "Copied!" : "Copy with Discord Formatting"}
                    </Button>
                  )}
                </CopyButton>
              </Group>

              <Alert title="How to use" color="blue">
                1. Choose your text and background colors 2. Enter your text in
                the text area 3. Copy the generated code 4. Paste it into
                Discord
              </Alert>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="about" pt="md">
            <Paper p="md" withBorder>
              <Title order={3}>About Discord Colored Text</Title>
              <Text mt="md">
                Discord allows you to add colored text in your messages using
                code blocks with specific language identifiers. Each language
                has its own syntax highlighting which can be used to create
                colored text.
              </Text>

              <Title order={4} mt="lg">
                Available Colors:
              </Title>

              <Stack mt="md" gap="xs">
                <Text>
                  <b>Text Colors:</b> Choose from red, green, yellow, blue, magenta, cyan, or white
                </Text>
                <Text>
                  <b>Background Colors:</b> Add optional background colors to make your text stand out
                </Text>
                <Text>
                  <b>Preview:</b> See how your text will look in Discord before sending
                </Text>
              </Stack>

              <Text mt="xl" size="sm" c="dimmed" ta="right" style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                Made by Rachit Katyal 😎
              </Text>
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
