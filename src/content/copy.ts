import {
  Building2,
  ClipboardCheck,
  Database,
  EyeOff,
  History,
  Link2Off,
  LockKeyhole,
  PenLine,
  QrCode,
  ScanLine,
  Send,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

/* §3 — Problemas que ele resolve */
export const problems = [
  {
    before: 'Lista de convidados em planilha e grupo de mensagem',
    after: 'Cada formando cadastra os próprios convidados, dentro do limite da turma. A equipe aprova ou devolve com a pendência apontada.',
    tag: 'lista',
  },
  {
    before: 'Termo impresso, assinado à mão e perdido numa pasta',
    after: 'Termo assinado no celular, com data, horário, IP e dispositivo registrados. Guardado e consultável.',
    tag: 'termo',
  },
  {
    before: 'Convite genérico, fácil de copiar e repassar',
    after: 'Convite personalizado com QR Code de uso único. A segunda leitura é negada.',
    tag: 'convite',
  },
  {
    before: 'Fila na porta, sem saber quem já entrou',
    after: 'Leitura do QR pelo celular, resultado em verde ou vermelho e contador de entradas ao vivo.',
    tag: 'portaria',
  },
  {
    before: 'Regra mudou depois do termo assinado. Virou conflito',
    after: 'Termos aditivos com versão, aceite do formando e PDF guardado exatamente como foi aceito.',
    tag: 'aditivo',
  },
] as const

/* §4 — A jornada */
export type StepSurface = 'Painel' | 'Portal' | 'Portaria'
export interface Step {
  id: string
  title: string
  text: string
  surface: StepSurface
  icon: LucideIcon
}

export const steps: Step[] = [
  { id: 'cadastro', title: 'A empresa cadastra', text: 'Cria a formatura, define o limite de convidados e cadastra os formandos.', surface: 'Painel', icon: Building2 },
  { id: 'link', title: 'Envio do link', text: 'Gera o link pessoal de cada formando e abre o WhatsApp com a mensagem pronta. A equipe só aperta enviar.', surface: 'Painel', icon: Send },
  { id: 'formando', title: 'O formando se cadastra', text: 'Confirma a identidade, informa os convidados e envia a lista para análise.', surface: 'Portal', icon: Smartphone },
  { id: 'analise', title: 'A equipe aprova', text: 'Confere a lista, aprova ou devolve apontando o que precisa corrigir.', surface: 'Painel', icon: ClipboardCheck },
  { id: 'assinatura', title: 'Assinatura do termo', text: 'O formando lê e assina o termo no celular. Se for menor de idade, assina o responsável legal.', surface: 'Portal', icon: PenLine },
  { id: 'convites', title: 'Convites com QR Code', text: 'O sistema gera um convite para cada pessoa. O formando baixa e envia.', surface: 'Portal', icon: QrCode },
  { id: 'portaria', title: 'Dia da festa', text: 'A portaria lê o QR pela câmera do celular: liberado ou negado na hora.', surface: 'Portaria', icon: ScanLine },
]

/* §5 — Para quem usa */
export const personas = [
  {
    id: 'empresa',
    label: 'Empresa',
    kicker: 'Painel da empresa',
    title: 'A turma inteira sob controle, em uma tela.',
    text: 'Indicadores e funil de andamento mostram quem enviou o cadastro, quem assinou o termo e quem já tem convite. Sem planilha paralela.',
    points: [
      'Funil da turma: cadastro enviado, termo assinado, convites gerados',
      'Arte do convite padronizada: você envia a arte, o sistema compõe cada convite',
      'Busca, filtros por etapa, fila de análise e atalhos de teclado',
      'Operadores de portaria ligados só às formaturas que podem operar',
    ],
  },
  {
    id: 'formando',
    label: 'Formando',
    kicker: 'Portal do formando',
    title: 'Tudo pelo celular, sem baixar nada.',
    text: 'O formando entra por um link pessoal, confirma a identidade e segue uma jornada em etapas, com a próxima ação sempre em destaque.',
    points: [
      'Acesso por link pessoal, sem criar senha',
      'Assinatura do termo na tela, com o dedo',
      'Convites como cartões prontos para baixar e enviar',
      'Se for menor de idade, assina o responsável legal',
    ],
  },
  {
    id: 'portaria',
    label: 'Portaria',
    kicker: 'Portaria',
    title: 'Liberado ou negado, em tela cheia.',
    text: 'A equipe aponta a câmera para o QR e o resultado ocupa a tela, com cor, ícone e texto. Convite já usado é negado, com o horário da primeira entrada.',
    points: [
      'Funciona em celular e tablet, direto no navegador',
      'Busca manual por nome ou CPF',
      'Liberação manual com justificativa registrada',
      'Contador de entradas e aviso de falta de conexão',
    ],
  },
] as const

export type PersonaId = (typeof personas)[number]['id']

/* §5 e §7 — Recursos, em índice */
export const featureGroups = [
  {
    title: 'Painel da empresa',
    items: [
      'Indicadores da turma e funil de andamento',
      'Busca, filtros por etapa, ordenação e fila de análise',
      'Arte do convite padronizada: você envia a arte, o sistema compõe cada convite',
      'Gestão de operadores de portaria por formatura',
      'Ambiente de teste separado dos dados reais',
    ],
  },
  {
    title: 'Portal do formando',
    items: [
      'Link pessoal com confirmação de identidade',
      'Jornada em etapas com a próxima ação em destaque',
      'Assinatura do termo na tela do celular',
      'Convites prontos para baixar e enviar',
    ],
  },
  {
    title: 'Portaria',
    items: [
      'Leitura de QR Code pela câmera',
      'Resultado em tela cheia: autorizado ou negado',
      'Busca manual e liberação com justificativa',
      'Contador de entradas e aviso de conexão',
    ],
  },
  {
    title: 'Plataforma',
    items: [
      'Sua marca em telas, convites e mensagens',
      'Termos aditivos versionados, com PDF do aceite',
      'Segundo fator de login opcional para a equipe',
      'Instalação dedicada, com banco de dados separado',
    ],
  },
] as const

/* §8 — Segurança e privacidade (sem selos nem promessas absolutas) */
export const securityPoints: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: EyeOff, title: 'CPF mascarado', text: 'Nas listas e telas de consulta, o CPF aparece parcialmente oculto.' },
  { icon: History, title: 'Registro de ações', text: 'O sistema registra quem fez o quê e quando.' },
  { icon: LockKeyhole, title: 'Bloqueio automático', text: 'Após tentativas erradas de acesso, o login é bloqueado automaticamente.' },
  { icon: Link2Off, title: 'Links que expiram', text: 'O link do formando deixa de valer quando um novo é gerado.' },
  { icon: ShieldCheck, title: 'Conexão criptografada', text: 'HTTPS e proteções contra os ataques comuns da web.' },
  { icon: Database, title: 'Instalação própria', text: 'Cada empresa-cliente tem a sua instalação, com banco de dados separado.' },
]

/* §13 — Perguntas frequentes */
export const faqs = [
  { q: 'O formando precisa baixar um aplicativo?', a: 'Não. Tudo funciona no navegador do celular, a partir de um link pessoal.' },
  { q: 'E se o formando for menor de idade?', a: 'O responsável legal é cadastrado e é ele quem assina o termo.' },
  { q: 'O convite pode ser copiado?', a: 'Cada convite tem um QR Code de uso único. Se alguém tentar usar de novo, a portaria vê o aviso e o horário da primeira entrada.' },
  { q: 'Posso usar a minha marca?', a: 'Sim. Nome, logo, cores e textos são os da sua empresa, em todas as telas, convites e mensagens.' },
  { q: 'Como o link chega ao formando?', a: 'O sistema monta a mensagem e abre o WhatsApp com o link pronto. A equipe só confirma o envio.' },
  { q: 'Os dados de outra empresa aparecem para mim?', a: 'Não. Cada cliente tem a própria instalação, com banco de dados separado.' },
  { q: 'Posso treinar a equipe antes?', a: 'Sim. Há um ambiente de teste separado, com dados fictícios, que não afeta os dados reais.' },
  { q: 'Funciona em tablet na portaria?', a: 'Sim. A portaria funciona em celular e tablet, com a câmera lendo o QR Code.' },
  { q: 'Quanto custa?', a: 'O valor depende do tamanho da operação. O modelo é licença de uso com mensalidade. Peça uma proposta pelo formulário.' },
] as const

/* Formulário — faixas de volume */
export const volumeOptions = ['1 a 5', '6 a 15', '16 a 30', '31 a 60', 'Mais de 60'] as const
