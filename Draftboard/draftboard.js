const URL = 'https://stage.draftboard.ai/api/v1/landing'
const noImageURL =
  'https://uploads-ssl.webflow.com/6363c032cc668650587183e2/65afb49eabbaf2f964605339_no-photo.png'
const jobsStatWrap = document.getElementById('jobsStatWrap')
const jobsListWrap = document.getElementById('jobsListWrap')
const sectionLatestJobs = document.getElementById('latest-job_from-api')

getApiJSON()

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
    sectionLatestJobs.style.display = 'block'
  } else {
    // render error
    sectionLatestJobs.style.display = 'none'
  }
}

async function renderApiJSON(apiJSON) {
  for (let i = apiJSON.functions.length - 1; i >= 0; i--) {
    // add child div with title and jobs count
    let newElem = jobsStatWrap.appendChild(document.createElement('p'))
    newElem.innerHTML = `
  <span class="jobFunction"><strong>${apiJSON.functions[i].function.title}</strong></span>
  <span class="jobCount">${apiJSON.functions[i].jobs}</span>
  `
  }

  for (let i = apiJSON.jobs.length - 1; i >= 0; i--) {
    let logoSrc
    if (apiJSON.jobs[i].company.logo) {
      logoSrc = `https://files.draftboard.com${apiJSON.jobs[i].company.logo}`

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

    newElem = jobsListWrap.appendChild(document.createElement('div'))
    newElem.className = 'jobItemWrap'
    newElem.innerHTML = `
  <img src="${logoSrc}" alt="${apiJSON.jobs[i].company.name}" class="jobLogo">
  <div class="jobItemInfo">
  <div class="jobCompany">${apiJSON.jobs[i].company.name}</div>
  <div class="jobTitle">${apiJSON.jobs[i].title}</div>
  <div class="jobLocation">${apiJSON.jobs[i].location}</div>
  </div>
  <div class="jobItemDetailsWrap">
  <div class="jobSalary">${apiJSON.jobs[i].details.bonus.format}</div>
  <a href="${apiJSON.jobs[i].links.linkedIn}" class="jobItemLink" target="_blank">Share</a>
  <a href="https://app.draftboard.com/" class="jobItemStar" target="_blank"><img src="https://uploads-ssl.webflow.com/6363c032cc668650587183e2/659ec5df9a8519dda28e3f84_star-icon.svg" alt="Star icon"></a>
  </div>
  `
  }
}
