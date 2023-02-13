import axios from 'axios'
const endpoint = 'https://api.github.com/graphql'
const token = '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'

const headers = {
  'content-type': 'application/json',
  Authorization: `Bearer ${token}`,
}

export const request = async query => {
  const response = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: {
      query,
    },
  })
  return response
}
