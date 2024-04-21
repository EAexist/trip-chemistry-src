
// import { Helmet } from "react-helmet";
import ReactHelmetAsync from "react-helmet-async";

const { Helmet } = ReactHelmetAsync;

interface HelmetWrapperProps {
    title?: string
    description?: string
    keywords?: string
    url?: string
    image?: string
    ogDescription?: string
}

const HelmetWrapper = ( props: HelmetWrapperProps ) => {
      return (
        <Helmet>
          <title>{props.title}</title>  
          <meta name="description" content={props.description} />
          <meta name="keywords" content={props.keywords} />
          <meta name="author" content="Hyeon" />
  
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={"여행 타입 테스트"} />
          <meta property="og:title" content={props.title} />
          <meta property="og:description" content={props.ogDescription ? props.ogDescription : props.description } />
          <meta property="og:url" content={props.url} />
          <meta property="og:image" content={props.image} />
    
          <link rel="canonical" href={props.url} />
        </Helmet>
      );
  };
  
  export default HelmetWrapper;