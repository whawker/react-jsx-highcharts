/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const Code = require(process.cwd() + '/core/Code.js');
const vanillaExample = require(process.cwd() + '/pages/vanilla_example');
const example = require(process.cwd() + '/pages/example');

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <span>
          React<span className="jsx">JSX</span>Highcharts
        </span>
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="#why">Why?</Button>
            <Button href="#example">Example</Button>
            <Button href={docUrl('doc1.html')}>Getting started</Button>
            <Button href="https://api.highcharts.com">Highcharts API Reference</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = ({ id, padding = ['top', 'bottom'], background, layout, align = 'center', className, children }) => (
      <Container
        id={id}
        padding={padding}
        background={background}>
        <GridBlock
          align={align}
          contents={children}
          layout={layout}
          className={className}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection"
        style={{ textAlign: 'center' }}>
        <h2>Utilise the power of React to create dynamic Highcharts charts!</h2>
      </div>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            title: 'More that just a simple wrapper',
            content: 'Separate components enabling fine grained control, for powerful dynamic charts',
            image: `${baseUrl}img/undraw_new_ideas.svg`,
            imageAlign: 'top'
          },
          {
            title: 'Highcharts with React superpowers',
            content: 'React hooks manage chart updates on your behalf, simplifying your code',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top'
          },
          {
            title: 'Developer friendly and highly extensible',
            content: 'Almost entirely matches the Highcharts API, meaning very few new concepts to learn',
            image: `${baseUrl}img/undraw_developer_activity.svg`,
            imageAlign: 'top'
          }
        ]}
      </Block>
    );

    const Products = () => (
      <Container
        padding={['top']}
        background="light"
        className="productShowcaseSection"
        style={{ textAlign: 'center' }}>
        <h2>Highcharts products supported</h2>
        <Block layout="fourColumn" className="product">
          {[
            {
              title: 'Highcharts',
              image: `${baseUrl}img/undraw_all_the_data.svg`,
              imageAlign: 'top'
            },
            {
              title: 'Highstock',
              image: `${baseUrl}img/undraw_financial_data.svg`,
              imageAlign: 'top'
            },
            {
              title: 'Highmaps',
              image: `${baseUrl}img/undraw_connected_world.svg`,
              imageAlign: 'top'
            },
            {
              title: 'Highcharts Gantt',
              content: '(Coming soon)',
              image: `${baseUrl}img/undraw_building_blocks.svg`,
              imageAlign: 'top'
            }
          ]}
        </Block>
      </Container>
    );

    const Description = () => (
      <Block id="why" background="dark" align="left" padding={[]}>
        {[
          {
            title: 'Why ReactJSXHighcharts?',
            content:
              'Unlike other React Highcharts wrapper libraries, **React JSX Highcharts** is designed to be dynamic - it is optimised for _interactive_ charts that need to adapt to business logic in your React application.\n' +
              '\n' +
              'Other Highcharts wrappers completely destroy and recreate the chart when the configuration options change, which is _very_ wasteful and inefficient.\n' +
              '\n' +
              'React JSX Highcharts uses a different approach. By providing React components for each Highcharts component, we can observe exactly which prop has changed and call the optimal Highcharts method behind the scenes. For example, if the `data` prop were to change on a `<Series />` component, React JSX Highcharts can follow Highcharts best practices and use the `setData` method rather than the more expensive `update`.\n' +
              '\n' +
              'React JSX Highcharts also enables you to write your _own_ Highcharts components, via its exposed React hooks.',
            image: `${baseUrl}img/undraw_choice.svg`,
            imageAlign: 'right'
          }
        ]}
      </Block>
    );

    const Example = () => (
      <Container
        id='example'
        padding={['bottom']}
        style={{ paddingTop: '1px' }}>
        <h2>Show me the money!</h2>

        <div className="gridBlock">
          <div className='column text'>
            <p>React JSX Highcharts allows you to convert this&hellip;</p>
          </div>
          <div className='column'>
            <Code>{vanillaExample}</Code>
          </div>
        </div>

        <div className="gridBlock">
          <div className='column text'>
            <p>Into this&hellip;</p>
          </div>
          <div className='column'>
            <Code>{example}</Code>
          </div>
        </div>
      </Container>
    );

    const Exceptions = () => (
      <Block background="light" align="left">
        {[
          {
            title: 'Surely there’s more too it?',
            content:
              'Ah! A healthy bit of skepticism I see!\n' +
              '\n' +
              'Yes, there are two _minor_ cases to consider - that aren’t just a direct API property to React prop swap.\n' +
              '\n' +
              `However they are in place to make code more React like, and less like jQuery like. Head over to the [docs](${baseUrl}docs) to see more.`,
            image: `${baseUrl}img/undraw_questions.svg`,
            imageAlign: 'left'
          }
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} className="link" key={user.infoLink}>
            <img src={`${baseUrl}${user.image}`} alt={user.caption} title={user.caption} />
            <span className="caption">{user.caption}</span>
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="showcase">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <FeatureCallout />
          <Features />
          <Products />
          <Description />
          <Example />
          <Exceptions />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
