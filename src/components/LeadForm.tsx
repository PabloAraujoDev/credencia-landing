import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, LoaderCircle, MessageCircle } from 'lucide-react'
import { volumeOptions } from '../content/copy'
import { basePath, env, site } from '../content/site'
import { track } from '../lib/analytics'
import { LeadSubmitError, buildWhatsAppUrl, maskPhone, submitLead, validateLead, type LeadData, type LeadErrors } from '../lib/lead'
import { Button } from './ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'whatsapp' | 'error'

const empty: LeadData = { nome: '', empresa: '', email: '', whatsapp: '', volume: '', consentimento: false }

const inputBase =
  'mt-2 block h-12 w-full rounded-xl border bg-white px-4 text-[0.98rem] text-ink placeholder:text-ink-mute/70 shadow-[0_1px_2px_rgb(23_17_31/0.04)] transition-[border-color,box-shadow] outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-200/70'

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 flex items-center gap-1.5 text-sm text-stop">
          <AlertCircle aria-hidden="true" className="size-4 flex-none" />
          {error}
        </p>
      )}
    </div>
  )
}

export function LeadForm() {
  const uid = useId()
  const [data, setData] = useState<LeadData>(empty)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waUrl, setWaUrl] = useState('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const honeypot = useRef<HTMLInputElement>(null)

  const id = (name: keyof LeadData) => `${uid}-${name}`

  // Leva o foco para a confirmação assim que ela é montada (leitores de tela anunciam)
  useEffect(() => {
    if (status === 'success' || status === 'whatsapp') successRef.current?.focus()
  }, [status])

  const set = <K extends keyof LeadData>(key: K, value: LeadData[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start')
    }
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const describedBy = (name: keyof LeadData, hint = false) =>
    errors[name] ? `${id(name)}-erro` : hint ? `${id(name)}-hint` : undefined

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    if (honeypot.current?.value) return

    const found = validateLead(data)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof LeadData)[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`)?.focus()
      return
    }

    track('form_submit')

    // Modo WhatsApp: abre a conversa já no gesto do usuário (evita bloqueio de pop-up)
    if (env.leadMode === 'whatsapp') {
      const url = buildWhatsAppUrl(data, env.whatsappNumber, site.name)
      setWaUrl(url)
      const win = window.open(url, '_blank')
      if (win) win.opener = null
      setStatus('whatsapp')
      track('form_success', { canal: 'whatsapp' })
      return
    }

    setStatus('submitting')
    try {
      await submitLead(data)
      setStatus('success')
      track('form_success')
    } catch (err) {
      const kind = err instanceof LeadSubmitError ? err.kind : 'network'
      setErrorMsg(
        kind === 'timeout'
          ? 'O envio demorou mais que o esperado. Verifique sua conexão e tente de novo.'
          : kind === 'config'
            ? 'O envio do formulário está indisponível no momento.'
            : 'Não conseguimos enviar seu pedido agora. Seus dados continuam preenchidos: tente de novo em instantes.',
      )
      setStatus('error')
      track('form_error', { tipo: kind })
    }
  }

  if (status === 'whatsapp') {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-go/10 text-go">
          <MessageCircle aria-hidden="true" className="size-6" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="font-wide mt-6 text-2xl font-semibold tracking-[-0.025em] outline-none">
          Falta só enviar, {data.nome.trim().split(' ')[0]}.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
          Abrimos o WhatsApp com o seu pedido já escrito. Toque em enviar por lá e combinamos a demonstração no ambiente de teste.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#1f9e54] px-6 font-semibold text-white transition-colors hover:bg-[#188346]"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          O WhatsApp não abriu? Abrir agora
        </a>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-medium text-ink-soft underline underline-offset-4 hover:text-ink">
          Corrigir meus dados
        </button>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-go/10 text-go">
          <CheckCircle2 aria-hidden="true" className="size-6" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="font-wide mt-6 text-2xl font-semibold tracking-[-0.025em] outline-none">
          Pedido recebido, {data.nome.trim().split(' ')[0]}.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
          Vamos falar com você pelo WhatsApp ou e-mail informado para combinar a demonstração no ambiente de teste.
        </p>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-legenda`} className="space-y-5">
      <p id={`${uid}-legenda`} className="text-sm text-ink-mute">
        Todos os campos são obrigatórios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('nome')} label="Nome" error={errors.nome}>
          <input
            id={id('nome')}
            name="nome"
            autoComplete="name"
            value={data.nome}
            onChange={(e) => set('nome', e.target.value)}
            aria-invalid={!!errors.nome}
            aria-describedby={describedBy('nome')}
            className={`${inputBase} ${errors.nome ? 'border-stop' : 'border-line'}`}
          />
        </Field>
        <Field id={id('empresa')} label="Empresa" error={errors.empresa}>
          <input
            id={id('empresa')}
            name="empresa"
            autoComplete="organization"
            value={data.empresa}
            onChange={(e) => set('empresa', e.target.value)}
            aria-invalid={!!errors.empresa}
            aria-describedby={describedBy('empresa')}
            className={`${inputBase} ${errors.empresa ? 'border-stop' : 'border-line'}`}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('email')} label="E-mail" error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={`${inputBase} ${errors.email ? 'border-stop' : 'border-line'}`}
          />
        </Field>
        <Field id={id('whatsapp')} label="WhatsApp" error={errors.whatsapp} hint="Com DDD.">
          <input
            id={id('whatsapp')}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 99999-9999"
            value={data.whatsapp}
            onChange={(e) => set('whatsapp', maskPhone(e.target.value))}
            aria-invalid={!!errors.whatsapp}
            aria-describedby={describedBy('whatsapp', true)}
            className={`${inputBase} font-mono ${errors.whatsapp ? 'border-stop' : 'border-line'}`}
          />
        </Field>
      </div>

      <Field id={id('volume')} label="Formaturas por ano" error={errors.volume}>
        <select
          id={id('volume')}
          name="volume"
          value={data.volume}
          onChange={(e) => set('volume', e.target.value)}
          aria-invalid={!!errors.volume}
          aria-describedby={describedBy('volume')}
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b6478%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 ${errors.volume ? 'border-stop' : 'border-line'} ${data.volume ? '' : 'text-ink-mute'}`}
        >
          <option value="" disabled>
            Selecione
          </option>
          {volumeOptions.map((v) => (
            <option key={v} value={v} className="text-ink">
              {v}
            </option>
          ))}
        </select>
      </Field>

      {/* Armadilha anti-spam: invisível para pessoas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Não preencha
          <input ref={honeypot} type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            id={id('consentimento')}
            type="checkbox"
            checked={data.consentimento}
            onChange={(e) => set('consentimento', e.target.checked)}
            aria-invalid={!!errors.consentimento}
            aria-describedby={describedBy('consentimento')}
            className="mt-0.5 size-5 flex-none cursor-pointer rounded accent-violet-700"
          />
          <span>
            Autorizo o contato para a demonstração e concordo com a{' '}
            <a href={`${basePath}privacidade.html`} className="font-semibold text-violet-700 underline underline-offset-2">
              política de privacidade
            </a>
            .
          </span>
        </label>
        {errors.consentimento && (
          <p id={`${id('consentimento')}-erro`} className="mt-1.5 flex items-center gap-1.5 text-sm text-stop">
            <AlertCircle aria-hidden="true" className="size-4 flex-none" />
            {errors.consentimento}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex gap-3 rounded-xl border border-stop/25 bg-stop/5 p-4 text-sm text-ink">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 flex-none text-stop" />
          <p>
            {errorMsg}
            {env.contactEmail && (
              <>
                {' '}
                Se preferir, escreva para{' '}
                <a className="font-semibold text-violet-700 underline" href={`mailto:${env.contactEmail}`}>
                  {env.contactEmail}
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting} arrow={!submitting} aria-live="polite">
        {submitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Enviando…
          </>
        ) : status === 'error' ? (
          'Tentar de novo'
        ) : (
          'Pedir demonstração'
        )}
      </Button>
    </form>
  )
}
