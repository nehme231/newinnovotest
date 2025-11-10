import { Electricity } from '../components/HeroSection/Electricity';
import { TypeWriter } from '../components/HeroSection/TypeWriter';
import { Highlight, WobbleCard } from '@innovo/animations';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@innovo/ui';
import { AutomationAnimation } from '../components/AiPoweredSection/AutomationAnimation';
import Image from 'next/image';
import { Explore } from '../components/ExploreSection/Explore';
import { IntegrationsMarquee } from '../components/SeamlessIntegrationSection/IntegrationsMarquee';
import { BlogsSection } from '../components/BlogsSection';
import { ContactUsSection } from '../components/ContactUsSection';
import Link from 'next/link';

interface Blogs {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
  };
  items: {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    categories: string[];
  }[];
}

const getMediumArticles = async () => {
  const response = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@innovoai'
  );
  const data = (await response.json()) as Blogs;

  return data.items.map((item) => {
    return {
      title: item.title,
      description: item.description,
      date: item.pubDate,
      image: item.thumbnail,
      link: item.link,
    };
  });
};

export const revalidate = 1800;

export default async function Index() {
  const aiVoiceAssistant = [
    {
      title: 'Answer Inquiries',
      description:
        'Respond to FAQs, product details, and handle common requests.',
    },
    {
      title: 'Book Meetings',
      description: 'Automatically schedule appointments and follow-ups.',
    },
    {
      title: 'Lead Qualification',
      description: 'Identify potential customers with targeted questions.',
    },
    {
      title: 'Customer Retention',
      description:
        'Engage and retain customers with prompt, personalized service.',
    },
  ];
  const aiPoweredAutomation = [
    {
      title: 'Task Management',
      description: 'Automate assignments and streamline project workflows.',
    },
    {
      title: 'Data Collection',
      description: 'Collect, sort, and manage information seamlessly.',
    },
    {
      title: 'CRM Updates',
      description: 'Sync customer interactions and updates with CRM systems',
    },
    {
      title: 'Follow-Up Sequences',
      description: 'Ensure timely, consistent follow-ups with customers.',
    },
  ];

  let blogs = await getMediumArticles();

  blogs = blogs.slice(0, 4).map((item) => {
    return {
      title: item.title,
      // remove all html tags from description and limit to 100 characters
      description: item.description
        .replace(/(<([^>]+)>)/gi, '')
        .substring(0, 100)
        .concat('...'),
      // transform date to a more readable format
      date: new Date(item.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image:
        item.image ||
        item.description.match(/src="([^"]*)/)?.[1] ||
        '/static/error-free-solution.webp',
      link: item.link,
    };
  });

  return (
    <div
      className={
        'flex flex-col items-center justify-center min-h-screen bg-black  relative'
      }
    >
      <div
        className={
          'absolute inset-0 z-0 bg-grid-white/[0.1] pointer-events-none animate-flicker drop-shadow-lg'
        }
        style={{
          boxShadow: '0px 0px 110px 100px inset #000000',
        }}
      ></div>
      <div className={'md:mt-[250px] mt-[100px] w-full text-center'}>
        <div
          className={
            ' z-[45] flex flex-col md:gap-[50px] gap-[20px] md:w-[80%] w-[90%] max-w-[1400px] mx-auto'
          }
        >
          <div className={'mx-auto max-w-[1100px] '}>
            <TypeWriter />
          </div>
          <h2
            className={
              'text-primary font-light md:text-5xl text-3xl mt-[10px] gap-y-5'
            }
          >
            <span className={'font-bold'}>Smart Automation</span> For{' '}
            <Highlight className={'text-black'}>Smarter Business.</Highlight>
          </h2>
          <p className={'py-[10px] text-white md:text-3xl text-xl'}>
            See How We Can Automate Your Success
          </p>
        </div>

        <div
          className={'flex flex-col h-[30vh] overflow-hidden justify-center'}
        >
          <Electricity />
        </div>
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full max-w-[1400px] z-[1]'
        }
      >
        <h2 className={'md:text-6xl text-3xl text-white text-center'}>
          Our AI-Powered Services
        </h2>

        <div
          className={
            'grid grid-cols-12 md:gap-x-[40px] md:gap-y-[0px] gap-x-[0] gap-y-[20px]'
          }
        >
          <div className={'col-span-12 md:col-span-6'}>
            <Card className={'h-full'} threeDEffect>
              <CardHeader threeDEffect>
                <CardTitle> AI Voice Assistants</CardTitle>
                <CardDescription>
                  Our AI Voice Assistants offer an intelligent, human-like touch
                  to every client interaction, ensuring that every call is
                  seamless, effective, and consistent. Available 24/7, our
                  assistants are designed to elevate client engagement, capture
                  every opportunity, and streamline communication, while
                  adapting to your business&#39;s specific needs.
                </CardDescription>
              </CardHeader>
              <CardContent
                threeDEffect
                className={'min-h-[200px] max-h-[344px] flex-1 h-full'}
              >
                <div
                  className={
                    'md:relative h-full w-full rounded-md overflow-hidden'
                  }
                >
                  <Image
                    src={'/static/ai-voice-assistant.webp'}
                    fill
                    alt={'aivoiceassistant'}
                  />
                </div>
              </CardContent>
              <CardFooter threeDEffect>
                <div className={'grid grid-cols-12 gap-x-[10px] gap-y-[20px]'}>
                  {aiVoiceAssistant.map((item, index) => (
                    <div
                      className={
                        'col-span-12 md:col-span-6 flex flex-col gap-[10px]'
                      }
                      key={'aiVoiceAssistant' + index}
                    >
                      <h3 className={'text-white'}>{item.title}</h3>
                      <p className={'text-muted-foreground'}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className={'col-span-12 md:col-span-6'}>
            <Card className={'h-full max-h-full'} threeDEffect>
              <CardHeader threeDEffect>
                <CardTitle> AI-Powered Automations</CardTitle>
                <CardDescription>
                  Our automation solutions are tailored to handle repetitive and
                  time-consuming tasks with unparalleled efficiency, enabling
                  your team to focus on strategic growth. From onboarding to
                  workflow management, we automate every step, so your
                  operations are faster, error-free, and more cost-effective.
                </CardDescription>
              </CardHeader>
              <CardContent threeDEffect>
                <AutomationAnimation />
              </CardContent>
              <CardFooter threeDEffect>
                <div className={'grid grid-cols-12 gap-x-[10px] gap-y-[20px]'}>
                  {aiPoweredAutomation.map((item, index) => (
                    <div
                      className={
                        'col-span-12 md:col-span-6 flex flex-col gap-[10px]'
                      }
                      key={'aiVoiceAssistant' + index}
                    >
                      <h3 className={'text-white'}>{item.title}</h3>
                      <p className={'text-muted-foreground'}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <Link href={'#demo'} className={'w-fit mx-auto'}>
          <Button className={'w-fit mx-auto'}>
            SEE OUR SERVICES IN ACTION
          </Button>
        </Link>
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
      >
        <h2 className={'md:text-6xl text-3xl text-white text-center'}>
          Benefits
        </h2>

        <div className={'grid grid-cols-12 gap-[10px]'}>
          <WobbleCard
            containerClassName="col-span-6 md:col-span-3 h-full aspect-square "
            className=" aspect-square"
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                24/7 Availability
              </h2>
            </div>{' '}
            <Image
              src={'/static/24-7-availability.webp'}
              fill
              alt={'24-7-availability'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-6 md:col-span-3 h-full   aspect-square "
            className=" aspect-square"
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                Never Miss a Lead
              </h2>
            </div>{' '}
            <Image
              src={'/static/never-miss-a-lead.webp'}
              fill
              alt={'never-miss-a-lead'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-12 md:col-span-6 h-full aspect-[2/1] "
            className={'aspect-[2/1]'}
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                Efficiency & Accuracy
              </h2>
            </div>{' '}
            <Image
              src={'/static/efficiency-accuracy.webp'}
              fill
              alt={'efficiency-accuracy'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-12 md:col-span-6 h-full  aspect-[2/1] "
            className={'aspect-[2/1]'}
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                Error-Free Solutions
              </h2>
            </div>{' '}
            <Image
              src={'/static/error-free-solution.webp'}
              fill
              alt={'error-free-solution'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-6 md:col-span-3 h-full  aspect-square "
            className=" aspect-square"
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                Cost Reduction
              </h2>
            </div>{' '}
            <Image
              src={'/static/cost-reduction.webp'}
              fill
              alt={'cost-reduction'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-6 md:col-span-3 h-full  aspect-square "
            className=" aspect-square"
          >
            <div className="absolute z-[45] inset-0 p-[50px] flex">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mt-auto">
                Scalability
              </h2>
            </div>{' '}
            <Image
              src={'/static/scalability.webp'}
              fill
              alt={'scalability'}
              className={
                'absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl scale-110'
              }
            />
          </WobbleCard>
        </div>
        <Link href={'#demo'} className={'w-fit mx-auto'}>
          <Button className={'w-fit mx-auto'}>
            SEE OUR SERVICES IN ACTION
          </Button>
        </Link>
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
        id={'demo'}
      >
        <div className={'flex flex-col gap-[20px] w-full'}>
          <h2 className={'md:text-6xl text-3xl text-white text-center'}>
            Explore Industries We Serve
          </h2>

          <p className={'text-center text-muted-foreground'}>
            Discover how we adapt our AI solutions to meet the unique needs of
            each industry.
          </p>

          <Explore />
        </div>
      </div>
      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[0]'
        }
      >
        <div className={'flex flex-col gap-[20px] w-full'}>
          <h2 className={'md:text-6xl text-3xl text-white text-center'}>
            Seamless Integrations
          </h2>

          <p className={'text-center text-muted-foreground'}>
            We integrate effortlessly with the platforms you trust to keep your
            business connected and efficient.
          </p>
        </div>

        <IntegrationsMarquee />
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
      >
        <div className={'flex flex-col gap-[20px] w-full'}>
          <h2 className={'md:text-6xl text-3xl text-white text-center'}>
            Blogs
          </h2>

          <p className={'text-center text-muted-foreground'}>
            Stay updated with the latest trends and insights in AI and
            automation.
          </p>
        </div>

        <BlogsSection blogs={blogs} />

        <Link
          href={'https://innovoai.medium.com/'}
          target={'_blank'}
          style={{
            margin: 'auto',
          }}
        >
          <Button className={'w-fit mx-auto'}>SEE MORE </Button>
        </Link>
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
        id={'contact-us'}
      >
        <ContactUsSection />
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
      >
        <div
          className={
            'grid grid-cols-12 md:gap-x-[40px] md:gap-y-[0px] gap-y-[40px] gap-x-[0px]'
          }
        >
          <div className={'md:col-span-6 col-span-12 flex order-2 md:order-1'}>
            <div
              className={
                'grid grid-cols-12 md:gap-[10px] gap-y-[10px] gap-x-[0px] my-auto w-full'
              }
            >
              <div className={'md:col-span-6 col-span-12'}>
                <Card className={'h-full'}>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <h2 className={'text-md font-bold text-white'}>
                      Extensive experience across diverse industries
                    </h2>
                  </CardContent>
                </Card>
              </div>
              <div className={'md:col-span-6 col-span-12'}>
                <Card className={'h-full'}>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <h2 className={'text-md font-bold text-white'}>
                      Proven results in increasing efficiency and accuracy
                    </h2>
                  </CardContent>
                </Card>
              </div>
              <div className={'md:col-span-6 col-span-12'}>
                <Card className={'h-full'}>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <h2 className={'text-md font-bold text-white'}>
                      Reducing operational costs for businesses
                    </h2>
                  </CardContent>
                </Card>
              </div>
              <div className={'md:col-span-6 col-span-12'}>
                <Card className={'h-full'}>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <h2 className={'text-md font-bold text-white'}>
                      Reliable and professional service – tailored for long-term
                      success
                    </h2>
                  </CardContent>
                </Card>
              </div>
              <div className={'col-span-12'}>
                <Card>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <h2 className={'text-md font-bold text-white'}>
                      A trustworthy, established team committed to helping
                      businesses reduce errors, cut costs, and scale faster with
                      automated, accurate solutions.
                    </h2>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className={'md:col-span-6 col-span-12 flex order-1 md:order-2'}>
            <div className={'flex flex-col gap-[40px] my-auto w-full'}>
              <h2 className={'text-5xl font-bold text-white'}>Who We Are</h2>

              <p className={'text-muted-foreground text-xl'}>
                Stands as a pioneer in AI and automation technology, driven by
                our commitment to empowering businesses to achieve new levels of
                efficiency and success. With years of experience across a
                diverse array of industries, we specialize in developing
                intelligent solutions that streamline operations, reduce costs,
                and eliminate errors.
              </p>

              <p className={'text-muted-foreground text-md'}>
                Every solution we offer is designed with your business growth in
                mind, ensuring seamless integration, consistent performance, and
                measurable results. Our team of dedicated experts is here to
                make automation not just accessible but impactful—turning your
                day-to-day challenges into strengths that drive you forward.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          'flex flex-col md:py-[110px] py-[50px] md:px-[50px] px-[20px] gap-[40px] w-full  max-w-[1400px] z-[1]'
        }
      >
        <h2 className={'md:text-6xl text-3xl text-white text-center'}>
          Ready to Transform Your Business?
        </h2>

        <Link href={'#contact-us'} className={'w-fit mx-auto'}>
          <Button className={'w-fit mx-auto'}>
            Book Your Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
}
