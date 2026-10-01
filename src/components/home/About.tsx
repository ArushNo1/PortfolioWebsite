import TerminalBox from '@/components/ui/TerminalBox'

interface AboutProps {
  id?: string
}

const vitals: Array<[string, string]> = [
  ['UNIT', 'ACES Cyber Honors LLC'],
  ['SCHOLAR', 'Banneker/Key'],
  ['FOCUS', 'Security tooling · systems · AI agents'],
  ['LANGUAGES', 'C++, Python, Rust, Java, TS'],
  ['ARENAS', 'CTFs · hackathons · competitive programming'],
]

export default function About({ id }: AboutProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <TerminalBox label="// SUBJECT_PROFILE">
          <p className="text-terminal-white text-sm leading-relaxed whitespace-pre-line">
            {`I work across full stack development, defensive security, and offensive security. I'm exploring AppSec and CNO to put coding and security in the same job.`}
            <br />
            {`Outside of coding, you can catch me playing geometry dash, watching kurzgesagt, or scrolling Wikipedia.`}
          </p>
        </TerminalBox>

        <TerminalBox label="// VITALS">
          <dl className="space-y-2">
            {vitals.map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <dt className="text-terminal-green-muted text-xs w-32 shrink-0 tracking-widest">
                  {k}
                </dt>
                <dd className="text-terminal-white text-xs">{v}</dd>
              </div>
            ))}
          </dl>
        </TerminalBox>
      </div>
    </section>
  )
}
