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
