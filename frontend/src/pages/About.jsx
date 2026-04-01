import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Citizens Reached', value: '1.2M+' },
    { label: 'Schemes Available', value: '450+' },
    { label: 'States Covered', value: '28' },
  ];

  const values = [
    {
      name: 'Transparency',
      description: 'Clear eligibility criteria and application processes, removing ambiguity from government benefits.',
    },
    {
      name: 'Accessibility',
      description: 'Designed for everyone, irrespective of digital literacy levels, with multi-language support.',
    },
    {
      name: 'Security',
      description: 'Your personal data is encrypted and handled with the highest standards of data protection laws.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-20"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We are on a mission to democratize access to government schemes. By leveraging technology, 
              we bridge the gap between welfare initiatives and the citizens who need them most.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Core Values</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Guided by principles of equity and technological innovation.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircle2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {value.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default About;
