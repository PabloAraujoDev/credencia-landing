import { basePath, cta, nav, site } from '../../content/site'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 pb-28 pt-16 text-white/60 md:pb-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed">
              {site.tagline}: lista de convidados, termo assinado, convite com QR Code e portaria, com a marca da sua empresa.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={cta.primary.href} className="hover:text-white">
                  Demonstração
                </a>
              </li>
              <li>
                <a href={`${basePath}privacidade.html`} className="hover:text-white">
                  Política de privacidade
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {site.year} {site.name}. Todos os direitos reservados.
          </p>
          <p>Telas ilustrativas com dados fictícios.</p>
        </div>
      </Container>
    </footer>
  )
}
