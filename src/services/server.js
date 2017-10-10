
const API = 'https://www.vegvesen.no/nvdb/api/v2';

const HEADERS = {
    Accept: 'application/vnd.vegvesen.nvdb-v2+json'
};


function getData(path) {

    const url = API + path;

    return fetch(url, HEADERS)
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
}

export function getVegobjekttyper() {
    const path = '/vegobjekttyper';
    return getData(path);
}

export function getVegobjekttype(id) {
    const path = '/vegobjekttyper/' + id;
    return getData(path);
}

export function getStatisticsVot(id) {
    const path = '/vegobjekter/' + id + '/statistikk';
    return getData(path);
}

export function getStatisticsEt(vot, et) {
    const path = '/vegobjekter/' + vot + '/statistikk?egenskap=%22' + et + '!=null%22';
    return getData(path);
}

export function getStatisticsTv(vot, et, tv) {
    const path = '/vegobjekter/' + vot + '/statistikk?egenskap=%22' + et + '=' + tv + '%22';
    return getData(path);
}
