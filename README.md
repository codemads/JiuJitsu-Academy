# 🥋 Academy Management System

Sistema de gerenciamento para academias de Jiu-Jitsu e outras artes marciais.

O objetivo do projeto é fornecer uma plataforma simples para professores e alunos gerenciarem aulas, presenças e evolução dos treinos.

---

## 🚀 Tecnologias

### Frontend

- HTML5
- Tailwind CSS
- JavaScript (ES6+)

### Backend

- Supabase
- PostgreSQL
- Supabase Authentication

### Controle de Versão

- Git
- GitHub

---

## 📋 Funcionalidades

### Autenticação

- [x] Tela de Login
- [x] Cadastro de Alunos
- [x] Recuperação de Senha
- [x] Logout

### Professor

- [ ] Aprovar ou rejeitar alunos
- [x] Gerenciar alunos
- [x] Criar aulas
- [x] Marcar presença
- [ ] Visualizar histórico de aulas

### Aluno

- [ ] Visualizar aulas concluídas
- [ ] Consultar frequência
- [ ] Acompanhar evolução
- [x] Visualizar graduações/faixas

### Futuro

- [ ] Controle financeiro
- [ ] Mensalidades
- [ ] Relatórios
- [ ] Aplicativo mobile

---

## 📂 Estrutura do Projeto

```plaintext
academy-management-system/
│
│─── RAIZ
│   dashboard-professor.html
│   dashboard.html
│   edit-aluno.html
│   index.html
│   README.md
│   recuperar-senha.html
│   register.html
│   reset-password.html
│
├
│
├───assets
│   ├───images
│   │   │   avatar-default.png
│   │   │   bg.jpg
│   │   │   logo.png
│   │   │
│   │   └───icons
│   │           favicon.ico
│   │
│   └───js
│       ├───components
│       │       avatar.js
│       │       modal.js
│       │       toast.js
│       │
│       ├───config
│       │       supabase.js
│       │
│       ├───pages
│       │       dashboardProfessor.js
│       │       edit-aluno.js
│       │       login.js
│       │       perfil.js
│       │       recuperaSenha.js
│       │       register.js
│       │       resetPassword.js
│       │
│       ├───services
│       │       auth.js
│       │       passwordService.js
│       │       presencaService.js
│       │       professorService.js
│       │       profileService.js
│       │
│       └───utils
└───css
        style.css
```

---

## 🎯 Roadmap

### Versão 1.0

- [x] Tela de Login
- [x] Cadastro de Alunos
- [x] Integração com Supabase
- [ ] Aprovação de Cadastro
- [x] Dashboard Professor
- [x] Dashboard Aluno

### Versão 2.0

- [ ] Registro de aulas
- [ ] Cria turmas
- [ ] Controle de Presença
- [ ] Redesign

### Versão 3.0

- [ ] Controle Financeiro
- [ ] Relatórios
- [ ] Estatísticas

---

## 🔒 Regras de Negócio

### Cadastro de Aluno

1. O aluno realiza seu cadastro.
2. O aluno acessa o dashboard com dados zerados.
3. O professor recebe a lista de alunos.
4. O professor aprova ou rejeita o aluno.
5. Após aprovação, o aluno está na turma do professor.

### Presença

1. O professor cria a aula.
2. O professor registra a presença.
3. O aluno pode visualizar seu histórico.

---

## 📝 Licença

Projeto desenvolvido para fins de estudo, experiencia pratica e uso em academias de artes marciais.

---

## 👨‍💻 Autor

Desenvolvido por Madson Santos.
