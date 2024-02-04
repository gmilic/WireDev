const URL = 'https://app.draftboard.com/api/v1/draftboard'

const imageURL = 'https://files-app.draftboard.com/'
const noImageURL =
  'https://uploads-ssl.webflow.com/6363c032cc668650587183e2/65afb49eabbaf2f964605339_no-photo.png'
const teamListWrap = document.getElementById('Section-team_list-wrap')

// getApiJSON()

async function getApiJSON() {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  const apiJSON = await response.json()

  if (apiJSON.status === 200) {
    // render apiJSON
    renderApiJSON(apiJSON)

    // sectionLatestJobs.style.display = 'block'
  } else {
    // render error
    // sectionLatestJobs.style.display = 'none'
  }
}

async function renderApiJSON(apiJSON) {
  for (let i = apiJSON.team.length - 1; i >= 0; i--) {
    let logoSrc
    if (apiJSON.team[i].avatar) {
      logoSrc = `${imageURL}${apiJSON.team[i].avatar}`

      // check if url in logoSrc works
      await fetch(logoSrc, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
        .then((response) => {})
        .catch((err) => {
          logoSrc = noImageURL
        })
    } else {
      // placeholder
      logoSrc = noImageURL
    }

    newElem = teamListWrap.appendChild(document.createElement('div'))
    newElem.className = 'section-team_list-item'
    newElem.innerHTML = `
  <div class="div-block-624" style="background-image: url(${logoSrc});">
  </div>
  <div class="div-block-625">
  <div class="text-block-89">${apiJSON.team[i].name}</div>
  <div class="text-block-90">${apiJSON.team[i].position}</div>
  </div>
  `
  }
}
