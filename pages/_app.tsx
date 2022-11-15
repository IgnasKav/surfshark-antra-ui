import type {AppProps} from 'next/app'
import {useState} from "react";
import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Head from 'next/head';
import {MantineProvider} from '@mantine/core';


export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <>
            <Head>
                <title>Surf shark antra</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme: 'light',
                        }}
                    >
                        <Component {...pageProps} />
                    </MantineProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}
