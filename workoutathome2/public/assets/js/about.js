const team = [
    {
        name: 'Michael Lerner',
        team: 'Product Team',
        desc: 'Product and team builder',
        link: 'michaellerner10@gmail.com',
        pic: 'https://i.imgur.com/qj2K5on.jpg',
        label: 'label-success'
    },
    {
        name: 'Adi Stein Ben-Nun',
        desc: 'Mom | Microsoft DevRel PM | Tech Ecosystem Promoter',
        team: 'Product Team',
        link: '#',
        pic: 'https://i.imgur.com/FnEfAPm.jpg',
        label: 'label-success'

    },
    {
        name: 'Dor Malka',
        desc: 'Software Design Engineer',
        team: 'Server Team',
        link: 'dormalk@gmail.com',
        pic: 'https://avatars1.githubusercontent.com/u/30365320?s=400&u=86e3a66efca0969beab572fbea8f5ba6519fdca1&v=4',
        label: 'label-warning'

    },
    {
        name: 'Omer Mizrahi',
        team: 'Client Team',
        desc: 'Front-end Developer',
        link: '#',
        pic: 'https://i.imgur.com/NbZ04as.jpg',
        label: 'label-danger'

    },
    {
        name: 'Sharon David',
        team: 'Product Team',
        desc: 'UI / UX Designer',
        link: '#',
        pic: 'https://i.imgur.com/uof2WZr.jpg',
        label: 'label-success'

    },
    {
        name: 'Shaina Carlebach Schiff',
        team: 'Client Team',
        desc: 'Full Stack Developer, ESL coach.',
        link: 'shainaschiff@outlook.com',
        pic: 'https://i.imgur.com/dMAJSMB.jpg',
        label: 'label-danger'

    }
    ,
    {
        name: 'Yaron Shemesh',
        team: 'Server Team',
        desc: 'Real Time Embedded Developer',
        link: '#',
        pic: 'https://i.imgur.com/RdeVdta.jpg',
        label: 'label-warning'

    }




]

function updateTeam(){
    var template = jQuery('#team-list').html();
    team.forEach((({team,name, link, pic, desc,label}) => {
      var html = Mustache.render(template,{team,name, link, pic, desc,label});
      jQuery('#team').append(html);
    }))
}


function submitForm(event){
    console.log(event)
    const frm = document.getElementById('contact-form');
    frm.reset()
}

$(document).ready(function(){
    updateTeam();
})