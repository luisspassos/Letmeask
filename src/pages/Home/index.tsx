import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import googleIconImg from '../../assets/images/google-icon.svg';
import { Aside } from '../../components/Aside';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { Container, MainContent, Form, Separator } from './styles';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle, canLogIn } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user && canLogIn) {
      await signInWithGoogle();
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.collection('rooms').doc(roomCode).get();

    if (!roomRef.exists) {
      // eslint-disable-next-line no-alert
      alert('Room does not exists.');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <Container>
      <Aside />
      <main>
        <MainContent>
          <Logo alignSelf="center" />
          <Button onClick={() => handleCreateRoom()} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>
          <Separator>ou entre em uma sala</Separator>
          <Form onSubmit={(event) => handleJoinRoom(event)}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}
