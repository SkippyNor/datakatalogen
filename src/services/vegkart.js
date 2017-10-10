
const VEGKART = 'https://www.vegvesen.no/vegkart/vegkart';


export function getVegkartLink(vot, et, tv) {

    let link = VEGKART + '/#kartlag:geodata/hva:(~(id:' + vot;

    if (et) {
        link += ',filter:(~(type_id:' + et;

        if (tv) {
            link += ',operator:\'*3d,verdi:(~' + tv + ')))';

        } else {
            link += ',operator:\'*21*3d,verdi:null))';

        }

    } else {
        link += ',filter:(~)';

    }

    link += ',farge:\'0_0))/hvor:(land:(~\'Norge))';

    return link;
}