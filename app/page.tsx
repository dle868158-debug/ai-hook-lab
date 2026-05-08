import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import TeacherIntro from '@/components/TeacherIntro';
import Advantages from '@/components/Advantages';
import TeachingMode from '@/components/TeachingMode';
import Reviews from '@/components/Reviews';
import Cases from '@/components/Cases';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Courses />
      <TeacherIntro />
      <Advantages />
      <TeachingMode />
      <Reviews />
      <Cases />
      <Contact />
      <Footer />
    </main>
  );
}
