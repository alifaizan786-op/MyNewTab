const userName = localStorage.getItem("name") || "";
const links = JSON.parse(localStorage.getItem("link")) || [];
const userCity = localStorage.getItem("city") || "";

let typingEffect = function (selector, text, callBack) {
  let element = selector;
  element.classList.add("typingEffect");
  let string = text;

  let i = 0;

  let startTyping = setInterval(function () {
    if (element.textContent.length !== string.length) {
      element.textContent += string[i];
      i++;
    } else {
      clearInterval(startTyping);
      if (callBack) {
        element.classList.remove("typingEffect");
        callBack();
      }
    }
  }, 50);
};

// Set Screen Name
document
  .querySelector("#saveNameBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let userInput = document.querySelector("#username").value;
    if (!userInput) {
      document.querySelector("#nameAlert").innerHTML =
        "Please Enter Your Screen Name";
      document.querySelector("#nameAlert").style.color = "red";
    } else {
      localStorage.setItem("name", userInput);
      document.querySelector(".divForm").classList.add("hide");
      document
        .querySelector("body > section > div.divFormTwo")
        .classList.remove("hide");
      typingEffect(
        document.querySelector(
          "body > section > div.divFormTwo > h2 > span:nth-child(1)"
        ),
        `Hey ${localStorage.getItem("name")} !`,
        () => {
          typingEffect(
            document.querySelector(
              "body > section > div.divFormTwo > h2 > span:nth-child(3)"
            ),
            "It's Nice To E-Meet You",
            () => {
              typingEffect(
                document.querySelector(
                  "body > section > div.divFormTwo > h2 > span:nth-child(5)"
                ),
                "Let's Set Your First Link"
              );
            }
          );
        }
      );
    }
  });

//Show Link Icon
document.querySelector("#linkInput").addEventListener("change", function () {
  let link = `https://www.google.com/s2/favicons?sz=64&domain_url=${
    document.querySelector("#linkInput").value
  }`;
  console.log(link);
  document.querySelector("#linkImage").src = link;
});

//Set 1st Link
document
  .querySelector("#saveLinkBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let userLink = document.querySelector("#linkInput").value;
    let tempArr = [];
    if (!userLink) {
      document.querySelector("#linkAlert").innerHTML = "Please Enter One Link";
      document.querySelector("#linkAlert").style.color = "red";
    } else {
      let tempObj = {
        link: userLink,
      };
      tempArr.push(tempObj);

      localStorage.setItem("link", JSON.stringify(tempArr));
      document.querySelector(".divFormTwo").classList.add("hide");
      document
        .querySelector("body > section > div.divFormThree")
        .classList.remove("hide");
      typingEffect(
        document.querySelector(
          "body > section > div.divFormThree > h2 > span.typingEffect"
        ),
        "Now Lastly, Let's Set Your City "
      );
    }
  });

//Set Your City
document
  .querySelector("#saveCityBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let userCity = document.querySelector("#cityInput").value;
    if (!userCity) {
      document.querySelector("#cityAlert").innerHTML = "Please Enter Your City";
      document.querySelector("#cityAlert").style.color = "red";
    } else {
      localStorage.setItem("city", userCity);
      document
        .querySelector("body > section > div.divFormThree")
        .classList.add("hide");
      // document.querySelector("mainHome").classList.remove("hide");
      renderNewTab()
    }
  });

let getTitle = function (url) {
  let title = "";
  $.ajax({
    url: url,
    method: "GET",
  }).then(async function (data) {
    const doc = await new DOMParser().parseFromString(data, "text/html");
    console.log(doc.querySelector("title").textContent.trim());
    title = await doc.querySelector("title").textContent.trim();
  });
  console.log(title);
  return title;
};

let renderNewTab = function () {
  document.querySelector("#setupSection").classList.add("hide");
  // document.querySelector("#setupSection").classList.remove("setupForm");
  document.querySelector("#mainHome").classList.remove("hide");

  let hourNow = dayjs().$H;

  if (hourNow <= 11) {
    typingEffect(
      document.querySelector("#welcomeGreetings"),
      "Good Morning !",
      () => {
        typingEffect(document.querySelector("#userName"), `Mr. ${userName}`);
      }
    );
  } else if (hourNow > 11 && hourNow <= 15) {
    typingEffect(
      document.querySelector("#welcomeGreetings"),
      "Good Afternoon !",
      () => {
        typingEffect(document.querySelector("#userName"), `Mr. ${userName}`);
      }
    );
  } else if (hourNow > 15 && hourNow <= 19) {
    typingEffect(
      document.querySelector("#welcomeGreetings"),
      "Good Evening !",
      () => {
        typingEffect(document.querySelector("#userName"), `Mr. ${userName}`);
      }
    );
  } else {
    typingEffect(
      document.querySelector("#welcomeGreetings"),
      "Good Night !",
      () => {
        typingEffect(document.querySelector("#userName"), `Mr. ${userName}`);
      }
    );
  }

  setInterval(function () {
    let curTime = dayjs().format(`dddd MMMM DD YYYY | hh : mm : ss`);
    document.querySelector("#time").textContent = curTime;
  }, 1000);

  let api1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&units=imperial&appid=a2eb597d271dbead6179a99d9d6c31da";

  $.ajax({
    url: api1,
    method: "GET",
  }).then(function (data) {
    document.querySelector("#cityName").textContent = data.name;
    document
      .querySelector("#weatherIcon")
      .setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
    document.querySelector("#feels_like").textContent =
      data.main.feels_like + "°";
    document.querySelector("#humidity").textContent = data.main.humidity;
    document.querySelector("#temperature").textContent = data.main.temp + "°";
    document.querySelector("#description").textContent =
      data.weather[0].description;
  });

  let htmlString = "";

  for (let i = 0; i < links.length; i++) {
    htmlString += `<div class=singleLink>
        <a href="${links[0].link}" target="_blank" rel="noopener noreferrer">
            <img src="${links[0].image}" alt="" srcset="">
            <p>${links[0].title}</p>
        </a>
    </div>`;
  }

  document.querySelector("#allLinks").innerHTML = htmlString;
};

if (!userName) {
  document.querySelector(".divForm").classList.remove("hide");
  typingEffect(
    document.querySelector("body > section > div > h2 > span:nth-child(1)"),
    "Hey, I am New Tab",
    () => {
      typingEffect(
        document.querySelector("body > section > div > h2 > span:nth-child(3)"),
        "What's Your Name ?"
      );
    }
  );
} else if (links.length === 0) {
  document
    .querySelector("body > section > div.divFormTwo")
    .classList.remove("hide");
  typingEffect(
    document.querySelector(
      "body > section > div.divFormTwo > h2 > span:nth-child(1)"
    ),
    `Hey ${localStorage.getItem("name")} !`,
    () => {
      typingEffect(
        document.querySelector(
          "body > section > div.divFormTwo > h2 > span:nth-child(3)"
        ),
        "It's Nice To E-Meet You",
        () => {
          typingEffect(
            document.querySelector(
              "body > section > div.divFormTwo > h2 > span:nth-child(5)"
            ),
            "Let's Set Your First Link"
          );
        }
      );
    }
  );
} else if (!userCity) {
  document
    .querySelector("body > section > div.divFormThree")
    .classList.remove("hide");
  typingEffect(
    document.querySelector(
      "body > section > div.divFormThree > h2 > span.typingEffect"
    ),
    "Now Lastly, Let's Set Your City "
  );
} else {
  renderNewTab();
}

if (links.length > 0) {
  let tempArr = [];
  for (let i = 0; i < links.length; i++) {
    let curLink = links[i].link;

    $.ajax({
      url: curLink,
      method: "GET",
    }).then(function (data) {
      const doc = new DOMParser().parseFromString(data, "text/html");
      let title = doc.querySelector("title").textContent.trim();
      let tempObj = {
        link: links[i].link,
        title: title,
        image: `https://www.google.com/s2/favicons?sz=64&domain_url=${curLink}`,
      };

      tempArr.push(tempObj);
      localStorage.setItem("link", JSON.stringify(tempArr))
    });
  }
}

document.querySelector(".addLink").addEventListener("click",function(){
  document.querySelector("#mainHome").classList.add("hide")
  document.querySelector("#setupSection").classList.remove("hide")
  document.querySelector(".divFormFour").classList.remove("hide")
  typingEffect(document.querySelector("#setupSection > div.divFormFour > h2 > span"), "Cool, Let's Add Another Link ! ")
})

document.querySelector("#saveNewLinkBtn").addEventListener("click", function(event){
  event.preventDefault()
  var alllink = JSON.parse(localStorage.getItem("link"))
  var curLink = document.querySelector("#newlinkInput").value
  var tempObj = {
    link : curLink
  }
  alllink.push(tempObj)
  console.log(tempObj);
  console.log(alllink);
  localStorage.setItem("link", JSON.stringify(alllink))
  location.reload()
})
