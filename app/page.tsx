import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-16 flex flex-col gap-8 items-center">
      <h1 className="text-5xl">Rapport de stage</h1>
      <div className="flex flex-col text-center gap-2">
        Cet outil permet de générer de manière interactive les rapports de stages 
        que le canton de Vaud ne propose qu'en PDF.
        <p>
        Si nécessaire, les documents officiels se trouvent sur <Link
            href="https://www.vd.ch/formation/orientation/faire-des-stages"
            className="text-sky-400 underline hover:text-sky-600 transition ease-in-out">
              https://www.vd.ch/formation/orientation/faire-des-stages
          </Link>.
        </p>
      </div>
      <div className="flex flex-col text-center gap-2">
        <p>
          Tu as effectué un stage en vue d’une formation professionnelle initiale.
          Prends la peine de remplir ce rapport de stage: tes impressions et tes 
          observations seront d’une grande utilité pour la suite de tes démarches.
          <br />
          <Link
            href="/stagiaire"
            className="font-bold text-sky-400 underline hover:text-sky-600 transition ease-in-out">
              Prends la peine de remplir ce rapport de stage
          </Link>
        </p>
        <br />
        <p>
          Vous avez reçu cet/cette élève pour un stage en vue d’une formation 
          professionnelle initiale. Vos impressions, vos observations sont d’un
          grand intérêt pour la préparation de son choix.
          <br />
          <Link
            href="/responsable"
            className="font-bold text-sky-400 underline hover:text-sky-600 transition ease-in-out">
              Nous vous remercions vivement de remplir ce rapport
          </Link>
        </p>
      </div>
    </div>
  );
}
