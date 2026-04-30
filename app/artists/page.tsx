'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const ARTISTS = [
  {
    name: 'Dominic Benhura',
    bio: `Born in 1968 in the small Zimbabwean village of Murewa, Dominic Benhura is critically acclaimed as one of the premier stone sculptors in the world, with exhibitions spanning over three decades across Africa, America, Asia, and Europe. He came to Harare as a boy and learned the art from other sculptors, including his cousin, eventually finding his own distinct niche. Where his forerunners' work was mostly static, Benhura created forms in motion. From the beginning he showed immense talent, and was working professionally by the age of twelve. His approach is quietly revolutionary. Benhura has an exceptional ability to portray human feeling through form rather than facial expression. Figures mid-leap, children mid-laugh, a body caught between gravity and flight. He has also pushed the boundaries of materials traditionally used in stone sculpture, using one stone inlaid into another to create decorative effects, and incorporating metal, wood, and wire to give his work new and unique qualities. The subjects are expansive. Plants, animals, birds. Though he is most drawn to women and children, a reflection of being raised by his mother and aunt after his father died shortly before he was born. Family runs through almost everything he makes. The reach of his work is hard to overstate. His Leap Frog series is viewed by millions annually as a permanent installation at Hartsfield International Airport in Atlanta, the world's busiest. In 2003, he personally presented Swing Me Mama to Nelson Mandela, which now stands in the permanent collection of the Nelson Mandela Foundation in Johannesburg. The British Museum holds an example of his work in its permanent collection. Dominic Studios, his Harare atelier, is home to a close-knit group of some of the finest sculptors on the continent. A place where the next generation of Zimbabwean stone carvers learns the craft from one of its living masters.`,
  },
  {
    name: 'Lovemore Bonjisi',
    bio: `Raised in Ruwa, Zimbabwe, within a family where sculpting was not a profession but a way of life, Lovemore Bonjisi came to the craft through his older brother Lameck. Unable to attend secondary school for lack of a birth certificate, he joined Lameck at twelve and threw himself into learning. By the time his documentation came through at fifteen, he was already a sculptor in every meaningful sense. When Lameck passed away in 2003, Lovemore carried the practice forward — and the weight of that inheritance is visible in his work, which draws deeply on the expressions and emotional life of the Shona people. His sculptures have been exhibited in the United States, Germany and the Netherlands.`,
  },
  {
    name: 'Gift Rusere',
    bio: `Gift Rusere grew up in Mhondoro, Mashonaland West, before moving to Mbare in Harare at twelve — where his maternal uncle Kunaka, who sold his work at Africa Unity Square, first placed a chisel in his hands. He started carving in 1998 while still at school and sold his first pieces at HIFA in 1999. A meeting with German painter Andreas Wutz opened him to abstraction and expanded what he understood sculpture could be. He works primarily in springstone, green opal, cobalt and leopard stone, materials whose character he knows intimately after more than two decades of practice.`,
  },
  {
    name: 'Itayi Mupumha',
    bio: `Born in 1975 in Rusape District, the eldest of eight, Itayi Mupumha relocated to Chitungwiza at eleven and completed his O-Levels in 1993 before turning his attention fully to stone. He began sculpting in 1994 under his uncle Richard Mupumha, working through a two-year apprenticeship before establishing himself as a full-time sculptor in 1996. He now works at Chitungwiza Arts Centre alongside his brother Onias. His sculptures have found their way into private collections in Germany, Italy, Britain, the United States, Australia and South Africa.`,
  },
  {
    name: 'Bywell Sango',
    bio: `Born in Guruve in 1979, Bywell Sango grew up in the shadow — and the influence — of his older brother Brighton, one of Zimbabwe's celebrated sculptors. He developed his practice early, absorbing the discipline while finding his own direction: a style rooted not in narrative or mythology but in the stone itself. He follows the material, letting its natural contours suggest the final form. He works in cobalt, opal, springstone and serpentine and has exhibited at the National Gallery of Zimbabwe and internationally across Austria, Germany, Denmark, Sweden, Norway, Finland and the United States.`,
  },
  {
    name: 'Phillip Mlima',
    bio: `Born in Harare in 1978 and raised in Mufokse Township, with family roots in Mutoko, Phillip Mlima began sculpting in 1998 in the Ruwa area — though the real foundation was laid two years earlier, when the celebrated Gerald Takawira took him under his wing. The eldest of five siblings and a father of three, his work spans creations, abstracts, animals, figurative birds and scenes drawn from Shona life. For Phillip, sculpting is inseparable from culture; his pieces are an ongoing conversation with the values and customs of the people he comes from.`,
  },
  {
    name: 'Tafadzwa Mamvura',
    bio: `Tafadzwa Tandi Mamvura comes from three generations of carvers: his grandfather Gabriel Tandi was a first-generation Shona sculptor, and his father Thomas Tandi carried that legacy into the second. Born in Mrewa, Zimbabwe, Tafadzwa had absorbed the fundamentals of the craft before he turned ten, mentored directly by his father. He has become known for work of exceptional precision — figurative torsos, busts and abstract pieces that honour the particular beauty of semi-precious stone. His sculptures feel less carved than coaxed, shaped by a hand that grew up understanding stone as a living material.`,
  },
  {
    name: 'Graham Rugoyi',
    bio: `Graham Rugoyi grew up in Chitungwiza under the influence of second-generation sculptor Ignatious Zhuwakiyi, a formative encounter that shaped both his eye and his ambitions. He exhibited at the German Embassy in Harare from 2006 to 2008 and has since placed work with private and public collectors across Europe and North America. His primary interest is the human figure — its postures, gestures and the way it moves through space — alongside animals and birds. He has continued making work through the practical difficulties that trade restrictions have imposed on artists of his generation, and his persistence shows.`,
  },
  {
    name: 'Wilberforce Chewa',
    bio: `Wilberforce Chewa was born in Guruve, a region that has produced some of Zimbabwe's most significant sculptors, including the late Brighton Sango and Edronzi Rukodzi. He began his artistic life at thirteen, developing his practice alongside his brothers John and Omiro before joining the Sanganai Art Group in 1995 and the Tengenenge Art Community in 1997. He now divides his time between a studio in Hatfield, Harare, and his workshop in Guruve. His work moves across human figures, birds and an increasingly abstract territory — forms that hold their origins lightly.`,
  },
]

function ArtistRow({ artist, index, isLast }: { artist: typeof ARTISTS[0]; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <button
          className="w-full py-10 md:py-12 text-left focus:outline-none group"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16">
            <span
              className="font-body shrink-0"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--stone)',
                opacity: 0.6,
                minWidth: '2rem',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center justify-between flex-1">
              <h2
                className="font-display text-charcoal transition-colors duration-300 group-hover:text-terracotta"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                {artist.name}
              </h2>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 ml-6"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  fontWeight: 200,
                  color: 'var(--stone)',
                  opacity: 0.5,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                +
              </motion.span>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="bio"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pb-10 md:pb-12 md:pl-[calc(2rem+4rem)]">
                <p
                  className="font-body text-charcoal leading-relaxed"
                  style={{ fontSize: '0.95rem', maxWidth: '42rem' }}
                >
                  {artist.bio}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!isLast && <div className="divider" />}
    </>
  )
}

export default function ArtistsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #C4C0BA, #B0ACA6)' }}>

      {/* Header */}
      <section className="pt-36 md:pt-44 px-6 md:px-16 max-w-7xl mx-auto">
        <p className="section-label mb-4">The Artists</p>
        <ScrollReveal>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Sculptors
          </h1>
        </ScrollReveal>
        <div className="divider mt-10" />
      </section>

      {/* Artist list */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto pb-32">
        {ARTISTS.map((artist, i) => (
          <ArtistRow
            key={artist.name}
            artist={artist}
            index={i}
            isLast={i === ARTISTS.length - 1}
          />
        ))}
      </section>

    </div>
  )
}
