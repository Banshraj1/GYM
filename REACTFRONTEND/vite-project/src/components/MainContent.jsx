import './Utils.css'
import './Style.css'
function MainContent(){
    return <>
    <main class="main">
        <section class="container flex justify-between">
          <div class="max-width50 flex flex-dxn-col justify-center">
            <div class="flex justify-center">
              <img src="../src/assets/dumble.png" class="dumble" alt="dumble" />
            </div>

            <h2 class="des-h bold clr-blakishblue">The Best Gym in the city</h2>
            <br />
            <p class="f-size-L clr-blue">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium nesciunt ut dolorum quod ex repellendus officia commodi
              doloribus! Excepturi perspiciatis quas aperiam accusantium quae
              alias perferendis veritatis doloribus adipisci. Eos?
            </p>
          </div>
          <div class="right-section max-width50">
            <img class="gym" src="../src/assets/gym.png" alt="gym_image" />
          </div>
        </section>
        <hr />
        <br />
        <section class="section2">
          <h1 class="txt-align-center clr-blakishblue">Pricing</h1>
          <br />
          <div class="flex justify-between">
            <div
              class="box flex flex-dxn-col justify-center border price txt-align-center"
            >
              <ul class="flex flex-dxn-col justify-evenly min-height-50">
                <li class="f-size-L bold">Free</li>
                <li class="bold f-size-L">₹ 0.00</li>
                <li>property1</li>
                <li>property2</li>
                <li>property3</li>
              </ul>
            </div>
            <div
              class="box flex flex-dxn-col justify-center border price txt-align-center"
            >
              <ul class="flex flex-dxn-col justify-evenly min-height-50">
                <li class="f-size-L bold">Free</li>
                <li class="bold f-size-L">₹ 100.00</li>
                <li>property1</li>
                <li>property2</li>
                <li>property3</li>
              </ul>
            </div>
            <div
              class="box flex flex-dxn-col justify-center border price txt-align-center"
            >
              <ul class="flex flex-dxn-col justify-evenly min-height-50">
                <li class="f-size-L bold">Free</li>
                <li class="bold f-size-L">₹ 250.00</li>
                <li>property1</li>
                <li>property2</li>
                <li>property3</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
}

export default MainContent