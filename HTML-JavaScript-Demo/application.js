// Application ------------------------------------------------------
class Application
{
    static GetTitle() 
    {
        return "SelectLine DemoApp";
    }

    static RedirectToPortal()
    {
        $('body').fadeOut(250, null, function()
        {
            window.location.href = "portal.html";
        });
    }

    static RedirectToLogin()
    {
        $('body').fadeOut(250, null, function()
        {
            window.location.href = "login.html";
        });        
    }

    static InitializeButtons()
    {
        $("input[type=button]").each(function(index, element)
        {
            var url = $(element).data("url");
            if (url !== undefined && url != null)
            {
                $(element).click(function()
                {
                    window.location.href = url;
                });
            }

        });
    }

    static SetSubtitle(name)
    {
        document.title = name + " - " + Application.GetTitle();
        $('header').append('<h2>' + name + '</h2>');
    }

    static InitializePage()
    {
        document.title = Application.GetTitle();
        $('head')
            .append('<html lang="de" xmlns="http://www.w3.org/1999/xhtml">')
            .append('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">')
            .append('<meta charset="utf-8" />')
            .append('<link rel="stylesheet" type="text/css" href="common.css" />');
        $('body').prepend('<header></header>');
        $('header').append('<h1>' + Application.GetTitle() + '</h1>');
        
        this.InitializeButtons();
        $('body').fadeIn(500);
    }
}

// API --------------------------------------------------------------
class Api
{
    static GetApiUrl()
    {
        return "https://demo.slmobile.de/demoapi/";
    }

    static async CallApiAsync(type, url, userToken, content)
    {
        var options = {
            method: type,
            headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }

        if (userToken !== undefined)
        {
            options.headers.Authorization = "LoginId " + userToken;
        }

        if (content !== undefined || content != null)
        {
            options.body = JSON.stringify(content);
        }

        const data = await fetch(this.GetApiUrl() + url, options);
        var json = await data.json();
        if (!data.ok) 
        {
            throw `Error: ${data.status} - ${json.ResponseCode} - ${json.Message}`;
        }

        return json;
    }

    static async GetApiAsync(url, userToken)
    {
        return await Api.CallApiAsync("GET", url, userToken);
    }

    static async PostApiAsync(url, userToken, content)
    {
        return await Api.CallApiAsync("POST", url, userToken, content)
    }    
}

// HTML -------------------------------------------------------------
class Html
{
    static ClearRows(grid)
    {
        var grid = document.querySelector(grid);
        grid.querySelectorAll("row").forEach(element =>
            {
                element.remove();
            });
    }

    static AppendRow(grid, model, clear)
    {
        var grid = document.querySelector(grid);
        var rowTemplate = grid.querySelector('template').content;
        var row = rowTemplate.cloneNode(true);
        row.querySelectorAll('[data-bind]').forEach(element =>
        {
            var hide = false;
            element.innerHTML = element.innerHTML
                .replace(/{{.*?}}/g, function (value, index) 
                {
                    var propertyName = value.slice(2, -2);
                    var propertyValue = model[propertyName];
                    if (propertyValue === undefined || propertyValue == null)
                    {
                        hide = true;
                        return null;
                    }

                    return propertyValue;
                });

            if (hide)
            {
                element.style.display = 'none';
            }
        });

        grid.appendChild(row);        
    }

    static HandleInput(elementName, callback)
    {
        $(elementName).focusout(function(event)
        {
            callback(event.target.value);
        })
        .keypress(function(event)
        {
            var keyCode = (event.keyCode ? event.keyCode : event.which);
            if (keyCode == '13')
            {
                callback(event.target.value);
                this.blur();
            }
        });        
    }

    static HandleClick(elementName, callback)
    {
        $(elementName).click(callback);
    }
}

// User -------------------------------------------------------------
class User
{
    static GetCurrentUserToken()
    {
        return sessionStorage["UserToken"];
    }

    static SetCurrentUserToken(userToken)
    {
        sessionStorage["UserToken"] = userToken;
    }

    static async GetUserAsync()
    {
        return await Api.GetApiAsync("Users/Current", User.GetCurrentUserToken());
    }

    static async HasUser()
    {
        try
        {
            var user = await User.GetUserAsync();
            return user !== undefined && user != null;
        }
        catch(e)
        {
            return false;
        }
    }

    static async LoginAsync(username, password, appkey) 
    {
        var result = await Api.PostApiAsync("Login", null, { UserName: username, Password: password, AppKey: appkey });
        User.SetCurrentUserToken(result.AccessToken);
    }

    static async LogoutAsync()
    {
        await Api.PostApiAsync("Logout", this.GetCurrentUserToken()).then(data =>
            {
                User.SetCurrentUserToken(null);
            });

    }
}

Application.InitializePage();