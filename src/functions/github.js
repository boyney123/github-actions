const request = require('request-promise')
const urljoin = require('url-join')

const transformAndWriteToFile = require('json-to-frontmatter-markdown/lib/transformToMarkdownString')

const getReadme = async url => {
  try {
    const readme = await request({
      url: urljoin(url, '/readme'),
      headers: {
        'user-agent': 'github-actions-things',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      json: true,
    })
    const { content = '' } = readme || {}
    return Buffer.from(content, 'base64')
  } catch (error) {
    console.log(error)
    return Promise.resolve('')
  }
}

const getTopicsForRepo = async url => {
  try {
    const topics = await request({
      url: urljoin(url, '/topics'),
      headers: {
        'user-agent': 'github-actions-things',
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      json: true,
    })
    const { names = [] } = topics || {}
    return names
  } catch (error) {
    console.log(error)
    return Promise.resolve([])
  }
}

exports.handler = async function(event, context, callback) {
  try {
    const { queryStringParameters: { url: github_url } = {} } = event

    if (!github_url) {
      return {
        statusCode: 400,
        body: 'Please provide a valid url in the query string',
      }
    }

    const urlsParts = github_url.split('github.com')

    const url = urljoin('https://api.github.com/repos', urlsParts[1])

    const data = await request({
      url,
      headers: {
        'user-agent': 'github-actions-things',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      json: true,
    })

    const topics = await getTopicsForRepo(url)
    const readme = await getReadme(url)

    const {
      name,
      html_url,
      description,
      homepage,
      language,
      license,
      owner: { login } = {},
    } = data

    const payload = await transformAndWriteToFile.default({
      frontmatter: [
        {
          path: `/${name}`,
          title: name,
          github_url,
          author: login,
          subtitle: description,
          tags: topics, // Get from tags api
        },
      ],
      body: readme,
    })

    return {
      statusCode: 200,
      body: payload,
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: 'Please provide a valid github url' }
  }
}
