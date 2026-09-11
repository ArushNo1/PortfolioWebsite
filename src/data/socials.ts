import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaHandshake } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'

export interface SocialLink {
  href: string
  label: string
  Icon: IconType
}

export const socialLinks: SocialLink[] = [
  { href: 'https://www.github.com/ArushNo1', label: 'github', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/arushbodla', label: 'linkedin', Icon: FaLinkedin },
  {
    href: 'https://app.joinhandshake.com/profiles/arushbodla',
    label: 'handshake',
    Icon: FaHandshake,
  },
  { href: 'https://codeforces.com/profile/ArushNo1', label: 'codeforces', Icon: SiCodeforces },
]
