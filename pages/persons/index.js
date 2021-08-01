import Layout from "../../components/layout/Layout";
import CardSimplePerson from "../../components/listContent/card/CardSimplePerson";
import IconPeople from "../../components/icons/IconPeople";
import { useRouter } from "next/router";
import { MainNavigation } from "../../components/navigation/Navigation";
import { cinemaAPI } from "../../services/api";

export async function getStaticProps() {
  const response = await cinemaAPI.get(`/persons/popular`);
  return {
    props: {
      listPerson: response.data.data,
    },
    revalidate: 86400,
  };
}

export default function Persons(props) {
  const { listPerson } = props;
  const router = useRouter();

  const goDetail = (e) => {
    router.push(`/persons/${e.id}`);
  };

  return (
    <Layout title="Persons">
      <header>
        <div className="relative h-16 lg:h-20 bg-gray-300 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <MainNavigation />
        </div>
      </header>
      <main>
        <div className="relative h-auto bg-gray-100 dark:bg-black text-black dark:text-white py-4 px-0 md:px-8 lg:px-14">
          <div className="flex justify-start items-center">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mr-3">
              Popular People
            </h3>
            <span>
              <IconPeople />
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-stretch">
            {listPerson.map((person, index) => {
              return (
                <CardSimplePerson
                  classWrapper="mx-0"
                  classImage="w-36 h-48 sm:w-36 sm:h-52 md:w-40 md:h-56 lg:w-56 lg:h-60"
                  classText="h-auto w-36 sm:w-36 md:w-40 lg:w-56"
                  key={index}
                  dataContent={person}
                  onHandleClick={(e) => goDetail(e)}
                />
              );
            })}
          </div>
        </div>
      </main>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
