const query = `
      query {
        hn{
          topStories(limit: 30){
            title,
            url,
            score,
            timeISO,
            descendants,
            by{id},
          }
        }
      }`;
const makeQuery = async query => {
  const response = await fetch('https://www.graphqlhub.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return await response.json();
};
const sitebit = url => {
  return url.split('://')[1].split('/')[0];
};
getHourDifference = date => {
  date1 = new Date(date);
  date2 = new Date();
  let diff = Math.abs(Math.round((date2.getTime() - date1.getTime()) / 3600000));
  return diff;
};
let main = document.querySelector('#mainlist');
const ready = () => {
  makeQuery(query).then(res => {
    res.data.hn.topStories.forEach(({ title, url, score, timeISO, descendants, by: { id } }, i) => {
      main.innerHTML += `<tr class="athing">
                  <td style="text-align:right;vertical-align:top" class="title"><span class="rank">${i + 1}</span></td>
                  <td style="vertical-align:top" class="votelinks">
                    <div style="text-align:center">
                      <a class=" " href="#">
                        <div class="votearrow" title="upvote"></div>
                      </a>
                    </div>
                  </td>
                  <td class="title">
                    <a class="storylink" href="#">${title}</a
                    ><span class="sitebit comhead">
                      <!-- -->(<a href="#"><span class="sitestr">${sitebit(url)}</span></a
                      >)</span
                    >
                  </td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td class="subtext">
                    <span class="score"
                      >${score}<!-- -->
                      points</span
                    >
                    by <a class="hnuser" href="#">${id}</a> <span class="age"><a href="#">${getHourDifference(
        timeISO,
      )} hours ago</a></span> |
                    <a href="#">hide</a> | <a href="#">${descendants} comments</a>
                  </td>
                </tr>
                <tr class="spacer" style="height:5px"></tr>`;
    });

    main.innerHTML += `<tr class="morespace" style="height:10px"></tr>
                <tr>
                  <td colspan="2"></td>
                  <td class="title"><a href="#" class="morelink" rel="nofollow">More</a></td>
                </tr>`;
  });
};

document.addEventListener('DOMContentLoaded', ready);
