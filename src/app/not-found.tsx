import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/nav/Navbar'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'

export const metadata: Metadata = {
  title: 'Not found · Arush Bodla',
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <p className="mb-3 font-mono text-sm text-terminal-red">
          <span className="text-terminal-green">$</span> cd: no such file or directory
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-[-.03em] text-terminal-bright">404</h1>
        <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-terminal-green-dim">
          That page doesn&apos;t exist, or it moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md bg-terminal-green px-5 py-3 text-[15px] font-medium text-terminal-bg hover:bg-terminal-bright transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="rounded-md border border-terminal-border-bright px-5 py-3 text-[15px] font-medium text-terminal-white hover:border-terminal-green transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="/lab"
            className="rounded-md px-5 py-3 text-[15px] font-medium text-terminal-green-dim hover:text-terminal-white transition-colors duration-200"
          >
            Lab
          </Link>
        </div>
      </main>
      <TerminalDrawer />
    </>
  )
}
