import type { IconType } from 'react-icons'
import {
  FaBug,
  FaSearch,
  FaGlobe,
  FaKey,
  FaLockOpen,
  FaFlag,
  FaJava,
  FaRobot,
  FaEyeSlash,
  FaWindows,
} from 'react-icons/fa'
import {
  SiWireshark,
  SiCplusplus,
  SiPython,
  SiRust,
  SiTypescript,
  SiSharp,
  SiNextdotjs,
  SiUnity,
  SiSupabase,
  SiDocker,
  SiTauri,
  SiUbuntu,
} from 'react-icons/si'

// Edit these arrays to add or remove skills.
// `detail` is the optional muted tool/context line under the name.

export interface Skill {
  name: string
  detail?: string
  Icon: IconType
}

export interface SkillGroup {
  label: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: '// SECURITY',
    skills: [
      { name: 'Binary exploitation', detail: 'pwndbg, GEF', Icon: FaBug },
      { name: 'Reverse engineering', detail: 'Ghidra', Icon: FaSearch },
      { name: 'Network forensics', detail: 'Wireshark', Icon: SiWireshark },
      { name: 'Steganography', detail: 'zsteg, steghide', Icon: FaEyeSlash },
      { name: 'Web exploitation', Icon: FaGlobe },
      { name: 'Cryptography', Icon: FaKey },
      { name: 'Password cracking', detail: 'Hashcat (GPU), John', Icon: FaLockOpen },
      { name: 'Windows internals', detail: 'Registry, EDR / DFIR', Icon: FaWindows },
      { name: 'CTF', detail: 'picoCTF, LM CyberQuest', Icon: FaFlag },
    ],
  },
  {
    label: '// LANGUAGES',
    skills: [
      { name: 'C++', detail: 'Codeforces / ICPC', Icon: SiCplusplus },
      { name: 'Python', detail: 'tooling, CTF scripts', Icon: SiPython },
      { name: 'Rust', detail: 'systems tools', Icon: SiRust },
      { name: 'Java', detail: 'JavaFX', Icon: FaJava },
      { name: 'TypeScript', detail: 'and JavaScript', Icon: SiTypescript },
      { name: 'C#', detail: 'Unity', Icon: SiSharp },
    ],
  },
  {
    label: '// BUILD',
    skills: [
      { name: 'Next.js / React', Icon: SiNextdotjs },
      { name: 'Tauri', detail: 'desktop apps', Icon: SiTauri },
      { name: 'Supabase', detail: 'Postgres, auth, realtime', Icon: SiSupabase },
      { name: 'Docker', detail: 'Compose, self-hosting', Icon: SiDocker },
      { name: 'AI agents', detail: 'LangGraph, RAG', Icon: FaRobot },
      { name: 'Unity', Icon: SiUnity },
      { name: 'Linux', detail: 'Ubuntu, WSL', Icon: SiUbuntu },
    ],
  },
]
