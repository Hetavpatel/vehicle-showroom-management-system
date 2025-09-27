import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage, ChatMessage } from '../services/chatbotService';

const HelpCenter = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'You are WellNest’s friendly assistant. Answer concisely and provide actionable steps. Collect intake if needed.'
    }
  ]);
  const [input, setInput] = useState('');

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    const nextMessages = [...messages, { role: 'user', content: input }];
    setMessages(nextMessages);
    setInput('');
    await mutation.mutateAsync(nextMessages);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Help center & AI concierge
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Knowledge base
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Answers to the most common questions from staff and members.
              </Typography>
              <Stack spacing={2}>
                {[{
                  title: 'How do I connect Google Calendar?',
                  answer: 'Navigate to Organization settings → Integrations → Connect Google. Grant domain-wide delegation.'
                },
                {
                  title: 'Where can I configure consent forms?',
                  answer: 'Go to Admin → Compliance. Upload HIPAA/GDPR templates and toggle per clinic.'
                },
                {
                  title: 'Can I collect deposits for classes?',
                  answer: 'Yes, connect Stripe and enable “Require deposit” in Class settings.'
                }].map((item) => (
                  <Box key={item.title}>
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.answer}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Chat with WellNest AI
              </Typography>
              <Stack spacing={2} sx={{ flexGrow: 1, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                {messages
                  .filter((message) => message.role !== 'system')
                  .map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        alignSelf: message.role === 'assistant' ? 'flex-start' : 'flex-end',
                        bgcolor: message.role === 'assistant' ? 'grey.100' : 'primary.main',
                        color: message.role === 'assistant' ? 'text.primary' : 'primary.contrastText',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        maxWidth: '80%'
                      }}
                    >
                      <Typography variant="body2">{message.content}</Typography>
                    </Box>
                  ))}
              </Stack>
              <Box component="form" onSubmit={handleSubmit} mt={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Ask about services, intake requirements, or rescheduling policies…"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button type="submit" variant="contained" disabled={mutation.isPending}>
                    Send
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default HelpCenter;
