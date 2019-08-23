class Index
{
    static Run()
    {
        Index.AnimateBar();
        Index.LoadApiInfoAsync()
        .then(async (data) =>
            {
                if (data)
                {
                    await Index.Sleep(2000);
                    Index.Redirect();
                }
            });    
    }

    static AnimateBar()
    {
        $(".Bar").animate({ width: "100%"}, 2000);
    }

    static async LoadApiInfoAsync()
    {
        return await Api.GetApiAsync("")
        .then(async (data) =>
        {
            $("#Product").html(data.Product);
            $("#Version").html(data.Version);
            $("#BuildDate").html(data.BuildDate);
            return true;
        })
        .catch(exception =>
        {
            $(".Error").html(exception);
            return false;
        });
    }  

    static Sleep(milliseconds)
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    static Redirect()
    {
        User.HasUser().then(hasUser =>
            {
                if (hasUser)
                {
                    Application.RedirectToPortal();
                }
                else
                {
                    Application.RedirectToLogin();
                }
            });
    }
}

Index.Run();
