import PageBanner from "../../components/PageBanner/PageBanner";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";

function Blog() {
  return (
    <div>
      <PageBanner title={"Blog"} pageRoute={"Blog"}></PageBanner>
      <div className="my-container mx-auto px-4">
        <div className="pt-14 xl:px-0 px-4">
          <div className="w-full lg:flex">
            <div className="lg:w-1/2">
              <img
                src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog1.png"
                className="w-full"
              />
              <div className="mt-8 lg:mb-0 mb-8">
                <h1 className="f-m-m text-2xl font-semibold leading-7">
                  Beautiful Italy, Travel Blog
                </h1>
                <p className="text-base f-m-m leading-loose mt-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. It has survived not only five centuries.
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div className="mt-6">
                  <ButtonPrimary>Red more</ButtonPrimary>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:ml-8">
              <h2 className="mb-6 text-2xl color-green font-semibold">
                Popular Blogs
              </h2>
              <div className="lg:flex items-start mb-8">
                <img
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog2.png"
                  className="w-full"
                />
                <div className="lg:ml-6">
                  <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">
                    A Broken Backpack
                  </h1>
                  <p className="text-base f-m-m leading-loose mt-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. It has survived not only five
                    centuries. Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </p>
                  <div className="mt-4">
                    <ButtonPrimary>Red more</ButtonPrimary>
                  </div>
                </div>
              </div>
              <div className="lg:flex items-start mb-8">
                <img
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog3.png"
                  className="w-full"
                />
                <div className="lg:ml-6">
                  <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">
                    My life’s a Movie
                  </h1>
                  <p className="text-base f-m-m leading-loose mt-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. It has survived not only five
                    centuries. Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </p>
                  <div className="mt-4">
                    <ButtonPrimary>Red more</ButtonPrimary>
                  </div>
                </div>
              </div>
              <div className="lg:flex items-start mb-8">
                <img
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png"
                  className="w-full"
                />
                <div className="lg:ml-6">
                  <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">
                    Lilii’s Travel Plans
                  </h1>
                  <p className="text-base f-m-m leading-loose mt-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. It has survived not only five
                    centuries. Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </p>
                  <div className="mt-4">
                    <ButtonPrimary>Red more</ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl color-green text-center font-semibold">
              Recent Blogs
            </h2>
            <div className="grid mb-10 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="max-w-sm  rounded overflow-hidden shadow-lg">
                <img
                  className="w-full h-[250px]"
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png"
                  alt="Mountain"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Mountain</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>

                <div className="text-right px-3 py-2">
                  <ButtonPrimary>Red more</ButtonPrimary>
                </div>
              </div>
              <div className="max-w-sm  rounded overflow-hidden shadow-lg">
                <img
                  className="w-full h-[250px]"
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png"
                  alt="Mountain"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Mountain</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>

                <div className="text-right px-3 py-2">
                  <ButtonPrimary>Red more</ButtonPrimary>
                </div>
              </div>
              <div className="max-w-sm  rounded overflow-hidden shadow-lg">
                <img
                  className="w-full h-[250px]"
                  src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png"
                  alt="Mountain"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Mountain</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, Nonea! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>

                <div className="text-right px-3 py-2">
                  <ButtonPrimary>Red more</ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}

export default Blog;
