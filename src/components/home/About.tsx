import TerminalBox from '@/components/ui/TerminalBox'

interface AboutProps {
  id?: string
}

const vitals: Array<[string, string]> = [
  ['UNIT', 'ACES Cyber LLC'],
  ['SCHOLARSHIP', 'Banneker/Key Full Ride'],
  ['INSTITUTION', 'University of Maryland'],
  ['STATUS', 'Incoming · Fall 2026'],
  ['LANGUAGES', 'C++, Python, Rust, Java, JS'],
  ['COMPETITIONS', 'picoCTF · LM CyberQuest · ICPC'],
]

export default function About({ id }: AboutProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <TerminalBox label="// SUBJECT_PROFILE">
          <p className="text-terminal-white text-sm leading-relaxed whitespace-pre-line">
            {/* TODO preserved verbatim */}
            {`TODO: 3–4 sentences bio. First person. Direct. No filler.
No "passionate developer". No "4+ years experience".
Just what you actually do and care about.`}
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
