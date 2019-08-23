class Portal
{
    LoadUser()
    {
        User.GetUserAsync()
        .then(user =>
        {
            if (user === undefined || user == null)
            {
                Application.RedirectToLogin();
            }
            
            this.User = user;
            $(".Welcome").find("span").append(user.DisplayName);
        })
        .catch(data =>
            {
                Application.RedirectToLogin();
            });
    }

    InitalizeLogoutButton()
    {
        $("#LogoutButton").click(function()
        {
            User.LogoutAsync();
            Application.RedirectToLogin();
        });
    }

    static Run()
    {
        Application.SetSubtitle("Portal");

        var portal = new Portal();
        portal.LoadUser();
        portal.InitalizeLogoutButton();
    }
}

Portal.Run();