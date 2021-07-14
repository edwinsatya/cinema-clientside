import Layout from "../../components/layout/Layout";
import ButtonLogo from "../../components/buttons/ButtonLogo";
import Link from "next/link";

export default function Register() {
  return (
    <Layout title="Register">
      <header>
        <div className="relative bg-white p-4 md:px-8 lg:px-12 flex">
          <div className="w-2/12">
            <Link href="/" passHref>
              <ButtonLogo />
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
