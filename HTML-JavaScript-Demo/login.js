class Login
{
    static Run()
    {
        Application.SetSubtitle("Login");
        $("#Login").click(async function()
        {
            $("#Login").attr("disabled", true); 
            $("#LoginResult").html("");
            try
            {
                await User.LoginAsync($("#Username").val(), $("#Password").val(), $("#AppKey").val());
                Application.RedirectToPortal();
            }
            catch (exception)
            {
                $("#LoginResult").html(exception);
            }

            $("#Login").attr("disabled", false); 
        });
    }
}

Login.Run();

