'use client';

import Login from "../../components/Login"; // Importujeme Login komponentu

export default function AdminPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Přihlášení administrátora</h1>
      <Login />
    </div>
  );
}