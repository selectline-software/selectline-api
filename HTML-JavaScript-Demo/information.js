class Information
{
    static Run()
    {
        Application.SetSubtitle("Information");
        this.ShowInformation();
    }

    static ShowInformation()
    {
        Api.GetApiAsync("").then(data =>
            {
                for (var item in data) 
                {
                    $("#InfoResult").append(`<div class="ApiInfo"><label>${item}</label><div>${data[item]}</div></div>`);
                }
            });
        
        User.GetUserAsync().then(data =>
            {
                for (var item in data) 
                {
                    $("#UserResult").append(`<div class="UserInfo"><label>${item}</label><div>${data[item]}</div></div>`);
                }
            });
    }

}

Information.Run();