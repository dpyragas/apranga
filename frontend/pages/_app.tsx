import type { AppProps, AppContext } from "next/app";
import Page from "../components/Page";
import Router from "next/router";

//TODO: customise
import NProgress from "nprogress";
import "../components/styles/nprogress.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";
import { NextPageContext } from "next";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface Props {
  apollo: ApolloClient<{}>;
}

function MyApp({ Component, pageProps, apollo }: AppProps & Props) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: AppContext & NextPageContext) {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
