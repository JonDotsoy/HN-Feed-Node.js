import {Router} from 'express'
import ms from 'ms'
import querystring from 'querystring'
import fetch from 'isomorphic-fetch'
import url from 'url'

const INITIAL_URL_FETCHING = url.parse('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')

// Declare router
export const router = Router()

function formatURLFetchin ({page}) {
  return url.format({
    protocol: INITIAL_URL_FETCHING.protocol,
    slashes: INITIAL_URL_FETCHING.slashes,
    hostname: INITIAL_URL_FETCHING.hostname,
    port: INITIAL_URL_FETCHING.port,
    pathname: INITIAL_URL_FETCHING.pathname,
    query: {
      ...querystring.decode(INITIAL_URL_FETCHING.query),
      page,
    }
  })
}

async function pullArticles (configs) {
  console.info('Pulling articles...')
  let articlesObtained = []
  let npage = 0
  // Model Article
  const Article = configs.db.Article

  let skippedFetch = false

  while (true && skippedFetch === false) {
    const urlArticleDownload = formatURLFetchin({ page: (npage += 1) })
    console.info(`Download page ${urlArticleDownload}`);
    const response = await fetch( urlArticleDownload )
    const {hits} = await response.json()

    if ( hits.length === 0 ) {
      break
    } else {
      for (const hit of hits) {
        // console.info(`Inspect hit: ${hit.objectID}`)
        const articleRelational = await Article.findOne({objectID: hit.objectID})

        if (articleRelational === null) {
          console.info(`create hit: ${hit.objectID}`)
          await Article.create(hit)
          articlesObtained.push(hit)
        } else {
          skippedFetch = true
          break
        }
      }
    }
  }

  console.info(`Total articles pulled: ${articlesObtained.length}`)
}

// Declare loop
async function loop (configs) {
  await pullArticles(configs)
}

function catchLoop (configs) {
  loop(configs).catch(console.error)
}

// Use to setup this load
export function setup (configs) {
  // Set Interval in 1 hours
  const intervalTime = ms('1h')

  console.info(`Define Interval in ${ms(intervalTime)} (${intervalTime}ms)`)

  setInterval(catchLoop, intervalTime, configs)
  catchLoop(configs)
}
