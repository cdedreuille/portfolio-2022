import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  aboutState: "closed" | "hover" | "active";
  setAboutState: (state: "closed" | "hover" | "active") => void;
}

export const Biography: FC<Props> = ({ aboutState, setAboutState }) => {
  return (
    <AnimatePresence>
      {aboutState === "active" && (
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 64 }}
          transition={{ duration: 0.4 }}
          className="bg-red h-screen fixed top-0 left-0 w-1/2 z-10 p-8 pt-[32vh] overflow-scroll"
          onClick={() => setAboutState("closed")}
        >
          <div className="text-white text-xl max-w-2xl mb-12">
            Charles is a multi-disciplinary maker of useful, curious and
            beautiful things. Using both design and code. Born in France, he now
            lives and works in London, UK.
          </div>
          <div className="text-white text-md ml-[30%]">
            <p className="mb-4">
              Tobias’ journey is a little different than most. He started his
              career by dropping out of high school at 15 with grand plans of
              becoming a software engineer. After realizing he, quite frankly,
              sucked at it, Tobias began teaching himself design at the age of
              16. Fast forward a few years and he is now a designer, founder,
              speaker, mentor and maker.
            </p>
            <p className="mb-4">
              Tobias is the co-founder of Semplice™ , a portfolio system and
              community of the world’s leading designers who represent brands
              such as HUGE, BBDO, Tumblr, Disney, Apple, Firstborn, Unit9, R/GA,
              Razorfish and many more. Since its launch in 2014, Semplice has
              attracted the upper echelon of creative talent, resulting in a
              Showcase mined by top companies, admired by creative peers and
              referenced by aspiring young talent.
            </p>
            <p className="mb-4">
              He is also the co-CEO of Carbonmade, which has helped more than 2
              million people launch their personalized online portfolio.
              Creative types of all kinds – photographers, makeup artists,
              concept artists, designers, illustrators and more – use Carbonmade
              to build beautiful websites in the easiest, fastest way possible.
              Most recently, Tobias co-founded mymind.com, a privacy-first tool
              using artificial intelligence to help you save and find everything
              you want to remember. The mymind community exploded while still in
              beta, and has continued to grow exponentially since its official
              launch.
            </p>
            <p className="mb-4">
              Tobias’ journey is a little different than most. He started his
              career by dropping out of high school at 15 with grand plans of
              becoming a software engineer. After realizing he, quite frankly,
              sucked at it, Tobias began teaching himself design at the age of
              16. Fast forward a few years and he is now a designer, founder,
              speaker, mentor and maker.
            </p>
            <p className="mb-4">
              Tobias is the co-founder of Semplice™ , a portfolio system and
              community of the world’s leading designers who represent brands
              such as HUGE, BBDO, Tumblr, Disney, Apple, Firstborn, Unit9, R/GA,
              Razorfish and many more. Since its launch in 2014, Semplice has
              attracted the upper echelon of creative talent, resulting in a
              Showcase mined by top companies, admired by creative peers and
              referenced by aspiring young talent.
            </p>
            <p className="mb-4">
              He is also the co-CEO of Carbonmade, which has helped more than 2
              million people launch their personalized online portfolio.
              Creative types of all kinds – photographers, makeup artists,
              concept artists, designers, illustrators and more – use Carbonmade
              to build beautiful websites in the easiest, fastest way possible.
              Most recently, Tobias co-founded mymind.com, a privacy-first tool
              using artificial intelligence to help you save and find everything
              you want to remember. The mymind community exploded while still in
              beta, and has continued to grow exponentially since its official
              launch.
            </p>
            <p className="mb-4">
              Tobias’ journey is a little different than most. He started his
              career by dropping out of high school at 15 with grand plans of
              becoming a software engineer. After realizing he, quite frankly,
              sucked at it, Tobias began teaching himself design at the age of
              16. Fast forward a few years and he is now a designer, founder,
              speaker, mentor and maker.
            </p>
            <p className="mb-4">
              Tobias is the co-founder of Semplice™ , a portfolio system and
              community of the world’s leading designers who represent brands
              such as HUGE, BBDO, Tumblr, Disney, Apple, Firstborn, Unit9, R/GA,
              Razorfish and many more. Since its launch in 2014, Semplice has
              attracted the upper echelon of creative talent, resulting in a
              Showcase mined by top companies, admired by creative peers and
              referenced by aspiring young talent.
            </p>
            <p className="mb-4">
              He is also the co-CEO of Carbonmade, which has helped more than 2
              million people launch their personalized online portfolio.
              Creative types of all kinds – photographers, makeup artists,
              concept artists, designers, illustrators and more – use Carbonmade
              to build beautiful websites in the easiest, fastest way possible.
              Most recently, Tobias co-founded mymind.com, a privacy-first tool
              using artificial intelligence to help you save and find everything
              you want to remember. The mymind community exploded while still in
              beta, and has continued to grow exponentially since its official
              launch.
            </p>
            <p className="mb-4">
              Tobias’ journey is a little different than most. He started his
              career by dropping out of high school at 15 with grand plans of
              becoming a software engineer. After realizing he, quite frankly,
              sucked at it, Tobias began teaching himself design at the age of
              16. Fast forward a few years and he is now a designer, founder,
              speaker, mentor and maker.
            </p>
            <p className="mb-4">
              Tobias is the co-founder of Semplice™ , a portfolio system and
              community of the world’s leading designers who represent brands
              such as HUGE, BBDO, Tumblr, Disney, Apple, Firstborn, Unit9, R/GA,
              Razorfish and many more. Since its launch in 2014, Semplice has
              attracted the upper echelon of creative talent, resulting in a
              Showcase mined by top companies, admired by creative peers and
              referenced by aspiring young talent.
            </p>
            <p className="mb-4">
              He is also the co-CEO of Carbonmade, which has helped more than 2
              million people launch their personalized online portfolio.
              Creative types of all kinds – photographers, makeup artists,
              concept artists, designers, illustrators and more – use Carbonmade
              to build beautiful websites in the easiest, fastest way possible.
              Most recently, Tobias co-founded mymind.com, a privacy-first tool
              using artificial intelligence to help you save and find everything
              you want to remember. The mymind community exploded while still in
              beta, and has continued to grow exponentially since its official
              launch.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
