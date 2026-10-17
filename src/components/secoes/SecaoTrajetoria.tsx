import { CONTATO, FORMACAO, TRAJETORIA } from '@/data/outros'
import styles from './SecaoTrajetoria.module.css'

export function SecaoTrajetoria() {
  return (
    <section id="trajetoria" className={styles.secao} aria-labelledby="titulo-trajetoria">
        <div className={`envoltorio ${styles.grade}`}>
          <div className="titulo-secao">
            <p className="rotulo">Trajetória</p>
            <h2 id="titulo-trajetoria">Do balcão ao código</h2>
            <p>
              Antes de construir sistemas, trabalhei do lado de quem usa: ouvidoria hospitalar e atendimento nas Fábricas
              de Cultura. Hoje construo para essas mesmas áreas.
            </p>
          </div>

          <ol className={styles.linhaDoTempo}>
            {TRAJETORIA.map((marco) => (
              <li key={marco.periodo} className={styles.marco}>
                <span className={styles.periodo}>{marco.periodo}</span>
                <h3>{marco.onde}</h3>
                <p>{marco.oQue}</p>
              </li>
            ))}
          </ol>

          <div className={styles.formacao}>
            <p className="rotulo">Formação e certificados</p>
            <ul>
              {FORMACAO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
  )
}

export function Rodape() {
  return (
    <footer id="contato" className={styles.contato}>
      <div className="envoltorio">
        <p className="rotulo">Contato</p>
        <h2>Vamos conversar sobre IA em sistemas reais.</h2>
        <ul className={styles.canais}>
          <li>
            <a href={CONTATO.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={CONTATO.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
