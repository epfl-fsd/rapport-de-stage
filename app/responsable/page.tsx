"use client";
import React from "react";
import EtatDeVaudSignature from "../components/EtatDeVaudSignature";
import { reportStorageInterface } from "@/interfaces/reportStorageInterface";
import SignaturePad from "signature_pad";
import * as packageJson from "../../package.json";

export default function Page() {
    const inputFile = React.useRef<HTMLInputElement | null>(null);
    const [rapportStorage, setRapportStorage] = React.useState<reportStorageInterface>({})
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const signaturePadRef = React.useRef<SignaturePad | null>(null);
    const signatureImageFile = React.useRef<HTMLInputElement | null>(null);
    
    React.useEffect(() => {
        const storedData = localStorage.getItem('rapport-de-stage');
        const storedDataObject = JSON.parse(storedData || '{}');
        if (storedData) {
            setRapportStorage(JSON.parse(storedData));
        }
        setIsDataLoaded(true);

        const timer = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
        
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            signaturePadRef.current = new SignaturePad(canvas, {penColor: "#1e22aa"});
            signaturePadRef.current.addEventListener("endStroke", () => {
                updateStorageOnChange('signature', signaturePadRef.current?.toDataURL() || '')
            });
            if(storedDataObject.signature) {
                signaturePadRef.current.fromDataURL(storedDataObject.signature);
            }
        }, 100);
        
          return () => clearTimeout(timer);
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirm = window.confirm('Voulez-vous vraiment importer les données de ce fichier ?')
        if(confirm) {
            const { files } = e.target;
            if (files && files.length) {
              const filename = files[0].name;
        
              var parts = filename.split(".");
              const fileType = parts[parts.length - 1];
              if(fileType != "json") {
                return alert("Merci d'importer un fichier JSON valide !")
              }

              const reader = new FileReader();
              reader.onload = (event) => {
                  try {
                      const fileContent = event.target?.result as string;
                      const jsonData = JSON.parse(fileContent);
                      localStorage.setItem('rapport-de-stage', JSON.stringify(jsonData))
                      location.reload()
                      
                  } catch (error) {
                      alert("Erreur de lecture du fichier JSON. Vérifiez que le fichier est bien formaté.");
                  }
              };
              reader.onerror = () => {
                  alert("Erreur lors de la lecture du fichier.");
              };
              reader.readAsText(files[0]);
            }
        }
    };

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirm = window.confirm('Voulez-vous vraiment importer cette signature ?')
        if(confirm) {
            const { files } = e.target;
            if (files && files.length) {
              const reader = new FileReader();
              reader.onload = (event) => {
                  try {
                        if(typeof(reader.result) == 'string') {
                            signaturePadRef.current?.fromDataURL(reader.result)
                            updateStorageOnChange('signature', reader.result)
                        }
                  } catch (error) {
                      alert("Erreur de lecture de l'image.");
                  }
              };
              reader.onerror = () => {
                  alert("Erreur lors de la lecture du fichier.");
              };
              reader.readAsDataURL(files[0]);
            }
        }
    };

    function updateStorageOnChange(element:string, elementValue:string) {
        setRapportStorage((prevRapportStorage) => {
            const updatedRapportStorage = {
                ...prevRapportStorage,
                [element]: elementValue,
            };
            localStorage.setItem('rapport-de-stage', JSON.stringify(updatedRapportStorage));
            return updatedRapportStorage;
        })
    }

    function onButtonClick() {
        inputFile.current?.click();
    };

    function download(filename:any, text:any) {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    function exportJSON() {
        download(`rapportStage_${rapportStorage['internFirstName']}_${rapportStorage['internLastName']}.json`, JSON.stringify(rapportStorage, null, 4))
    };
    return (
        isDataLoaded && (
            <div className="mx-4 my-4 md:mx-14 md:my-14">
                <div id="tools-div" className="mb-4 flex gap-4">
                    <input
                        style={{ display: "none" }}
                        accept=".json"
                        ref={inputFile}
                        onChange={handleFileUpload}
                        type="file"
                    />
                    <button className="
                        bg-red-500
                        p-2
                        rounded-lg
                        text-white
                        hover:bg-red-600
                        transition
                        ease-in-out"
                        onClick={(e) => onButtonClick()}
                    >
                        Importer (JSON)
                    </button>
                    <button className="
                        bg-red-600
                        p-2
                        rounded-lg
                        text-white
                        hover:bg-red-800
                        transition
                        ease-in-out"
                        onClick={(e) => exportJSON()}
                    >
                        Exporter (JSON)
                    </button>
                    <button
                        onClick={() => {
                            const date = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' }).replace(' ', '_')
                            document.title=`${rapportStorage['internFirstName']}_${rapportStorage['internLastName']}_Rapport_de_stage_EPFL_responsables_${date}`
                            window.print()
                        }}
                        className="
                            bg-gray-500
                            p-2
                            rounded-lg
                            text-white
                            hover:bg-gray-600
                            transition
                            ease-in-out
                        "
                    >
                        Imprimer
                    </button>
                </div>
                {/* TITLES & DESCRIPTION */}
                <h1 className="text-4xl text-[#e42313]">RAPPORT DE STAGE</h1>
                <h1 className="text-4xl text-[#e42313] font-semibold">RESPONSABLE DU STAGE</h1>
                <p id="main-description" className="mt-8">
                    Vous avez reçu cet/cette élève pour un stage en vue d’une formation professionnelle initiale.<br />
                    Vos impressions, vos observations sont d’un grand intérêt pour la préparation de son choix.<br />
                    Nous vous remercions vivement de remplir cette fiche.
                </p>
                {/* "ENTREPRISE" SECTION */}
                <div className="dotted-box mt-4 border-[3px] border-dotted border-[#e42313] px-6 py-3 max-w-4xl">
                    <h2 className="text-3xl text-[#e42313]">ENTREPRISE</h2>
                    <div className="flex flex-col md:flex-row md:gap-5">                    
                        <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Nom de l&apos;entreprise&nbsp;
                                <input id="entrepriseName" defaultValue={rapportStorage.entrepriseName} onChange={(e) => updateStorageOnChange('entrepriseName', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Nom du responsable&nbsp;
                                <input id="responsibleName" defaultValue={rapportStorage.responsibleName} onChange={(e) => updateStorageOnChange('responsibleName', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                E-mail&nbsp;
                                <input id="responsibleMail" defaultValue={rapportStorage.responsibleMail} onChange={(e) => updateStorageOnChange('responsibleMail', e.target.value)} type="email" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                        <div className="dotted-input-under-title mt-3 md:mt-5 flex flex-col gap-3 md:w-1/2">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Adresse&nbsp;
                                <input id="responsiblePostalAddress" defaultValue={rapportStorage.responsiblePostalAddress} onChange={(e) => updateStorageOnChange('responsiblePostalAddress', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    N° postal&nbsp;
                                    <input id="responsiblePostalCode" defaultValue={rapportStorage.responsiblePostalCode} onChange={(e) => updateStorageOnChange('responsiblePostalCode', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    Localité&nbsp;
                                    <input id="responsibleLocality" defaultValue={rapportStorage.responsibleLocality} onChange={(e) => updateStorageOnChange('responsibleLocality', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Téléphone&nbsp;
                                <input id="responsiblePhone" defaultValue={rapportStorage.responsiblePhone} onChange={(e) => updateStorageOnChange('responsiblePhone', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                    </div>
                </div>
                {/* "STAGIAIRE" SECTION */}
                <div className="dotted-box mt-6 border-[3px] border-dotted border-[#e42313] px-6 py-3 max-w-4xl">
                    <h2 className="text-3xl text-[#e42313]">STAGIAIRE</h2>
                    <div className="flex flex-col md:flex-row md:gap-5">                    
                        <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Nom&nbsp;
                                <input id="internLastName" defaultValue={rapportStorage.internLastName} onChange={(e) => updateStorageOnChange('internLastName', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Prénom&nbsp;
                                <input id="internFirstName" defaultValue={rapportStorage.internFirstName} onChange={(e) => updateStorageOnChange('internFirstName', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    Classe&nbsp;
                                    <input id="internClass" defaultValue={rapportStorage.internClass} onChange={(e) => updateStorageOnChange('internClass', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    Établissement&nbsp;
                                    <input id="internEstablishment" defaultValue={rapportStorage.internEstablishment} onChange={(e) => updateStorageOnChange('internEstablishment', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                            </div>
                        </div>
                        <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Adresse&nbsp;
                                <input id="internAddress" defaultValue={rapportStorage.internAddress} onChange={(e) => updateStorageOnChange('internAddress', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    N° postal&nbsp;
                                    <input id="internPostalCode" defaultValue={rapportStorage.internPostalCode} onChange={(e) => updateStorageOnChange('internPostalCode', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                                <div className="dotted-input-text flex whitespace-nowrap">
                                    Localité&nbsp;
                                    <input id="internLocality" defaultValue={rapportStorage.internLocality} onChange={(e) => updateStorageOnChange('internLocality', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                                </div>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Téléphone&nbsp;
                                <input id="internPhone" defaultValue={rapportStorage.internPhone} onChange={(e) => updateStorageOnChange('internPhone', e.target.value)} type="email" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="internship-job-of flex flex-col sm:flex-row gap-5 mt-8">
                        <div className="w-full">
                            <div className="dotted-input-text flex flex-col md:flex-row whitespace-nowrap w-full">
                                Stage dans le métier de&nbsp;
                                <input id="job" defaultValue={rapportStorage.job} onChange={(e) => updateStorageOnChange('job', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                        <div className="flex flex-col min-[450px]:flex-row gap-3 w-full">
                            <div className="dotted-input-text flex whitespace-nowrap w-1/2 max-[450px]:w-full">
                                du&nbsp;
                                <input id="beginDate" defaultValue={rapportStorage.beginDate} onChange={(e) => updateStorageOnChange('beginDate', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap w-1/2 max-[450px]:w-full">
                                au&nbsp;
                                <input id="endDate" defaultValue={rapportStorage.endDate} onChange={(e) => updateStorageOnChange('endDate', e.target.value)} type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                    </div>
                </div>
                {/* "ATTITUDE GÉNÉRALE" SECTION */}
                <h2 className="section-title mt-8 text-3xl text-[#e42313]">ATTITUDE GÉNÉRALE</h2>
                <div className="radios-section max-w-2xl">
                    <div className="appreciations-text md:flex gap-5 md:justify-end font-semibold hidden">
                        <span>Très bien</span>
                        <span>Satisfaisant</span>
                        <span>À améliorer</span>
                        <span>Pas observé</span>
                    </div>
                    <div className="flex flex-col gap-6 md:gap-0">
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Votre première impression</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="first-impression-really-good">Très bien</label>
                                    <input name="first-impression" value="really-good" defaultChecked={rapportStorage.firstImpression == 'really-good'} onChange={(e) => updateStorageOnChange('firstImpression', e.target.value)} id="first-impression-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="first-impression-satisfying">Satisfaisant</label>
                                    <input name="first-impression" value="satisfying" defaultChecked={rapportStorage.firstImpression == 'satisfying'} onChange={(e) => updateStorageOnChange('firstImpression', e.target.value)} id="first-impression-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="first-impression-to-upgrade">À améliorer</label>
                                    <input name="first-impression" value="to-upgrade" defaultChecked={rapportStorage.firstImpression == 'to-upgrade'} onChange={(e) => updateStorageOnChange('firstImpression', e.target.value)} id="first-impression-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="first-impression-not-observed">Pas observé</label>
                                    <input name="first-impression" value="not-observed" defaultChecked={rapportStorage.firstImpression == 'not-observed'} onChange={(e) => updateStorageOnChange('firstImpression', e.target.value)} id="first-impression-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Ponctualité</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="ponctuality-really-good">Très bien</label>
                                    <input name="ponctuality" value="really-good" defaultChecked={rapportStorage.ponctuality == 'really-good'} onChange={(e) => updateStorageOnChange('ponctuality', e.target.value)} id="ponctuality-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="ponctuality-satisfying">Satisfaisant</label>
                                    <input name="ponctuality" value="satisfying" defaultChecked={rapportStorage.ponctuality == 'satisfying'} onChange={(e) => updateStorageOnChange('ponctuality', e.target.value)} id="ponctuality-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="ponctuality-to-upgrade">À améliorer</label>
                                    <input name="ponctuality"value="to-upgrade" defaultChecked={rapportStorage.ponctuality == 'to-upgrade'} onChange={(e) => updateStorageOnChange('ponctuality', e.target.value)} id="ponctuality-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="ponctuality-not-observed">Pas observé</label>
                                    <input name="ponctuality" value="not-observed" defaultChecked={rapportStorage.ponctuality == 'not-observed'} onChange={(e) => updateStorageOnChange('ponctuality', e.target.value)} id="ponctuality-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Confiance en soi</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="self-confidence-really-good">Très bien</label>
                                    <input name="self-confidence" value="really-good" defaultChecked={rapportStorage.selfConfidence == 'really-good'} onChange={(e) => updateStorageOnChange('selfConfidence', e.target.value)} id="self-confidence-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="self-confidence-satisfying">Satisfaisant</label>
                                    <input name="self-confidence" value="satisfying" defaultChecked={rapportStorage.selfConfidence == 'satisfying'} onChange={(e) => updateStorageOnChange('selfConfidence', e.target.value)} id="self-confidence-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="self-confidence-to-upgrade">À améliorer</label>
                                    <input name="self-confidence" value="to-upgrade" defaultChecked={rapportStorage.selfConfidence == 'to-upgrade'} onChange={(e) => updateStorageOnChange('selfConfidence', e.target.value)} id="self-confidence-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="self-confidence-not-observed">Pas observé</label>
                                    <input name="self-confidence" value="not-observed" defaultChecked={rapportStorage.selfConfidence == 'not-observed'} onChange={(e) => updateStorageOnChange('selfConfidence', e.target.value)} id="self-confidence-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Dynamisme</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="dynamism-really-good">Très bien</label>
                                    <input name="dynamism" value="really-good" defaultChecked={rapportStorage.dynamism == 'really-good'} onChange={(e) => updateStorageOnChange('dynamism', e.target.value)} id="dynamism-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="dynamism-satisfying">Satisfaisant</label>
                                    <input name="dynamism" value="satisfying" defaultChecked={rapportStorage.dynamism == 'satisfying'} onChange={(e) => updateStorageOnChange('dynamism', e.target.value)} id="dynamism-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="dynamism-to-upgrade">À améliorer</label>
                                    <input name="dynamism" value="to-upgrade" defaultChecked={rapportStorage.dynamism == 'to-upgrade'} onChange={(e) => updateStorageOnChange('dynamism', e.target.value)} id="dynamism-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="dynamism-not-observed">Pas observé</label>
                                    <input name="dynamism" value="not-observed" defaultChecked={rapportStorage.dynamism == 'not-observed'} onChange={(e) => updateStorageOnChange('dynamism', e.target.value)} id="dynamism-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Attention, concentration</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attention-concentration-really-good">Très bien</label>
                                    <input name="attention-concentration" value="really-good" defaultChecked={rapportStorage.concentrationSpan == 'really-good'} onChange={(e) => updateStorageOnChange('concentrationSpan', e.target.value)} id="attention-concentration-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attention-concentration-satisfying">Satisfaisant</label>
                                    <input name="attention-concentration" value="satisfying" defaultChecked={rapportStorage.concentrationSpan == 'satisfying'} onChange={(e) => updateStorageOnChange('concentrationSpan', e.target.value)} id="attention-concentration-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attention-concentration-to-upgrade">À améliorer</label>
                                    <input name="attention-concentration" value="to-upgrade" defaultChecked={rapportStorage.concentrationSpan == 'to-upgrade'} onChange={(e) => updateStorageOnChange('concentrationSpan', e.target.value)} id="attention-concentration-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attention-concentration-not-observed">Pas observé</label>
                                    <input name="attention-concentration" value="not-observed" defaultChecked={rapportStorage.concentrationSpan == 'not-observed'} onChange={(e) => updateStorageOnChange('concentrationSpan', e.target.value)} id="attention-concentration-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Curiosité</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="curiosity-really-good">Très bien</label>
                                    <input name="curiosity" value="really-good" defaultChecked={rapportStorage.curiosity == 'really-good'} onChange={(e) => updateStorageOnChange('curiosity', e.target.value)} id="curiosity-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="curiosity-satisfying">Satisfaisant</label>
                                    <input name="curiosity" value="satisfying" defaultChecked={rapportStorage.curiosity == 'satisfying'} onChange={(e) => updateStorageOnChange('curiosity', e.target.value)} id="curiosity-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="curiosity-to-upgrade">À améliorer</label>
                                    <input name="curiosity" value="to-upgrade" defaultChecked={rapportStorage.curiosity == 'to-upgrade'} onChange={(e) => updateStorageOnChange('curiosity', e.target.value)} id="curiosity-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="curiosity-not-observed">Pas observé</label>
                                    <input name="curiosity" value="not-observed" defaultChecked={rapportStorage.curiosity == 'not-observed'} onChange={(e) => updateStorageOnChange('curiosity', e.target.value)} id="curiosity-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Esprit d&apos;initiative (sollicite du travail)</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="initiative-spirit-really-good">Très bien</label>
                                    <input name="initiative-spirit" value="really-good" defaultChecked={rapportStorage.commitment == 'really-good'} onChange={(e) => updateStorageOnChange('commitment', e.target.value)} id="initiative-spirit-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="initiative-spirit-satisfying">Satisfaisant</label>
                                    <input name="initiative-spirit" value="satisfying" defaultChecked={rapportStorage.commitment == 'satisfying'} onChange={(e) => updateStorageOnChange('commitment', e.target.value)} id="initiative-spirit-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="initiative-spirit-to-upgrade">À améliorer</label>
                                    <input name="initiative-spirit" value="to-upgrade" defaultChecked={rapportStorage.commitment == 'to-upgrade'} onChange={(e) => updateStorageOnChange('commitment', e.target.value)} id="initiative-spirit-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="initiative-spirit-not-observed">Pas observé</label>
                                    <input name="initiative-spirit" value="not-observed" defaultChecked={rapportStorage.commitment == 'not-observed'} onChange={(e) => updateStorageOnChange('commitment', e.target.value)} id="initiative-spirit-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Plaisir d&apos;apprendre</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="learning-pleasure-really-good">Très bien</label>
                                    <input name="learning-pleasure" value="really-good" defaultChecked={rapportStorage.interestLearning == 'really-good'} onChange={(e) => updateStorageOnChange('interestLearning', e.target.value)} id="learning-pleasure-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="learning-pleasure-satisfying">Satisfaisant</label>
                                    <input name="learning-pleasure" value="satisfying" defaultChecked={rapportStorage.interestLearning == 'satisfying'} onChange={(e) => updateStorageOnChange('interestLearning', e.target.value)} id="learning-pleasure-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="learning-pleasure-to-upgrade">À améliorer</label>
                                    <input name="learning-pleasure" value="to-upgrade" defaultChecked={rapportStorage.interestLearning == 'to-upgrade'} onChange={(e) => updateStorageOnChange('interestLearning', e.target.value)} id="learning-pleasure-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="learning-pleasure-not-observed">Pas observé</label>
                                    <input name="learning-pleasure" value="not-observed" defaultChecked={rapportStorage.interestLearning == 'not-observed'} onChange={(e) => updateStorageOnChange('interestLearning', e.target.value)} id="learning-pleasure-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="observations-remarks mt-6 max-w-4xl whitespace-nowrap">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row whitespace-nowrap w-full">
                            Remarques / Observations&nbsp;
                            <textarea className="w-full box-border resize-none overflow-y-hidden" defaultValue={rapportStorage.attitudeRemarks} onChange={(e) => updateStorageOnChange('attitudeRemarks', e.target.value)} placeholder={".".repeat(500)}></textarea>
                        </div>
                    </div>
                </div>
                {/* "EXÉCUTION DES TÂCHES" SECTION */}
                <h2 className="section-title mt-8 text-3xl text-[#e42313]">EXÉCUTION DES TÂCHES</h2>
                <div className="radios-section max-w-2xl">
                    <div className="appreciations-text md:flex gap-5 md:justify-end font-semibold hidden">
                        <span>Très bien</span>
                        <span>Satisfaisant</span>
                        <span>À améliorer</span>
                        <span>Pas observé</span>
                    </div>
                    <div className="flex flex-col gap-6 md:gap-0">
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Habile</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="skillful-really-good">Très bien</label>
                                    <input name="skillful" value="really-good" defaultChecked={rapportStorage.skillful == 'really-good'} onChange={(e) => updateStorageOnChange('skillful', e.target.value)} id="skillful-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="skillful-satisfying">Satisfaisant</label>
                                    <input name="skillful" value="satisfying" defaultChecked={rapportStorage.skillful == 'satisfying'} onChange={(e) => updateStorageOnChange('skillful', e.target.value)} id="skillful-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="skillful-to-upgrade">À améliorer</label>
                                    <input name="skillful" value="to-upgrade" defaultChecked={rapportStorage.skillful == 'to-upgrade'} onChange={(e) => updateStorageOnChange('skillful', e.target.value)} id="skillful-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="skillful-not-observed">Pas observé</label>
                                    <input name="skillful" value="not-observed" defaultChecked={rapportStorage.skillful == 'not-observed'} onChange={(e) => updateStorageOnChange('skillful', e.target.value)} id="skillful-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Rapide</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="fast-really-good">Très bien</label>
                                    <input name="fast" value="really-good" defaultChecked={rapportStorage.fast == 'really-good'} onChange={(e) => updateStorageOnChange('fast', e.target.value)} id="fast-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="fast-satisfying">Satisfaisant</label>
                                    <input name="fast" value="satisfying" defaultChecked={rapportStorage.fast == 'satisfying'} onChange={(e) => updateStorageOnChange('fast', e.target.value)} id="fast-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="fast-to-upgrade">À améliorer</label>
                                    <input name="fast" value="to-upgrade" defaultChecked={rapportStorage.fast == 'to-upgrade'} onChange={(e) => updateStorageOnChange('fast', e.target.value)} id="fast-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="fast-not-observed">Pas observé</label>
                                    <input name="fast" value="not-observed" defaultChecked={rapportStorage.fast == 'not-observed'} onChange={(e) => updateStorageOnChange('fast', e.target.value)} id="fast-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Soigneux-se</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="careful-really-good">Très bien</label>
                                    <input name="careful" value="really-good" defaultChecked={rapportStorage.careful == 'really-good'} onChange={(e) => updateStorageOnChange('careful', e.target.value)} id="careful-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="careful-satisfying">Satisfaisant</label>
                                    <input name="careful" value="satisfying" defaultChecked={rapportStorage.careful == 'satisfying'} onChange={(e) => updateStorageOnChange('careful', e.target.value)} id="careful-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="careful-to-upgrade">À améliorer</label>
                                    <input name="careful" value="to-upgrade" defaultChecked={rapportStorage.careful == 'to-upgrade'} onChange={(e) => updateStorageOnChange('careful', e.target.value)} id="careful-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="careful-not-observed">Pas observé</label>
                                    <input name="careful" value="not-observed" defaultChecked={rapportStorage.careful == 'not-observed'} onChange={(e) => updateStorageOnChange('careful', e.target.value)} id="careful-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Méthodique</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="methodical-really-good">Très bien</label>
                                    <input name="methodical" value="really-good" defaultChecked={rapportStorage.methodical == 'really-good'} onChange={(e) => updateStorageOnChange('methodical', e.target.value)} id="methodical-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="methodical-satisfying">Satisfaisant</label>
                                    <input name="methodical" value="satisfying" defaultChecked={rapportStorage.methodical == 'satisfying'} onChange={(e) => updateStorageOnChange('methodical', e.target.value)} id="methodical-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="methodical-to-upgrade">À améliorer</label>
                                    <input name="methodical" value="to-upgrade" defaultChecked={rapportStorage.methodical == 'to-upgrade'} onChange={(e) => updateStorageOnChange('methodical', e.target.value)} id="methodical-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="methodical-not-observed">Pas observé</label>
                                    <input name="methodical" value="not-observed" defaultChecked={rapportStorage.methodical == 'not-observed'} onChange={(e) => updateStorageOnChange('methodical', e.target.value)} id="methodical-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Persévérant-e</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="persevering-really-good">Très bien</label>
                                    <input name="persevering" value="really-good" defaultChecked={rapportStorage.persevering == 'really-good'} onChange={(e) => updateStorageOnChange('persevering', e.target.value)} id="persevering-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="persevering-satisfying">Satisfaisant</label>
                                    <input name="persevering" value="satisfying" defaultChecked={rapportStorage.persevering == 'satisfying'} onChange={(e) => updateStorageOnChange('persevering', e.target.value)} id="persevering-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="persevering-to-upgrade">À améliorer</label>
                                    <input name="persevering" value="to-upgrade" defaultChecked={rapportStorage.persevering == 'to-upgrade'} onChange={(e) => updateStorageOnChange('persevering', e.target.value)} id="persevering-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="persevering-not-observed">Pas observé</label>
                                    <input name="persevering" value="not-observed" defaultChecked={rapportStorage.persevering == 'not-observed'} onChange={(e) => updateStorageOnChange('persevering', e.target.value)} id="persevering-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Attentif-ve</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attentive-really-good">Très bien</label>
                                    <input name="attentive" value="really-good" defaultChecked={rapportStorage.attentive == 'really-good'} onChange={(e) => updateStorageOnChange('attentive', e.target.value)} id="attentive-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attentive-satisfying">Satisfaisant</label>
                                    <input name="attentive" value="satisfying" defaultChecked={rapportStorage.attentive == 'satisfying'} onChange={(e) => updateStorageOnChange('attentive', e.target.value)} id="attentive-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attentive-to-upgrade">À améliorer</label>
                                    <input name="attentive" value="to-upgrade" defaultChecked={rapportStorage.attentive == 'to-upgrade'} onChange={(e) => updateStorageOnChange('attentive', e.target.value)} id="attentive-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="attentive-not-observed">Pas observé</label>
                                    <input name="attentive" value="not-observed" defaultChecked={rapportStorage.attentive == 'not-observed'} onChange={(e) => updateStorageOnChange('attentive', e.target.value)} id="attentive-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Comprend rapidement les consignes</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="understands-fast-really-good">Très bien</label>
                                    <input name="understands-fast" value="really-good" defaultChecked={rapportStorage.followInstructions == 'really-good'} onChange={(e) => updateStorageOnChange('followInstructions', e.target.value)} id="understands-fast-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="understands-fast-satisfying">Satisfaisant</label>
                                    <input name="understands-fast" value="satisfying" defaultChecked={rapportStorage.followInstructions == 'satisfying'} onChange={(e) => updateStorageOnChange('followInstructions', e.target.value)} id="understands-fast-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="understands-fast-to-upgrade">À améliorer</label>
                                    <input name="understands-fast" value="to-upgrade" defaultChecked={rapportStorage.followInstructions == 'to-upgrade'} onChange={(e) => updateStorageOnChange('followInstructions', e.target.value)} id="understands-fast-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="understands-fast-not-observed">Pas observé</label>
                                    <input name="understands-fast" value="not-observed" defaultChecked={rapportStorage.followInstructions == 'not-observed'} onChange={(e) => updateStorageOnChange('followInstructions', e.target.value)} id="understands-fast-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="observations-remarks mt-6 max-w-4xl whitespace-nowrap">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row whitespace-nowrap w-full">
                            Remarques / Observations&nbsp;
                            <textarea className="w-full box-border resize-none overflow-y-hidden" defaultValue={rapportStorage.tasksExecRemarks} onChange={(e) => updateStorageOnChange('tasksExecRemarks', e.target.value)} placeholder={".".repeat(500)}></textarea>
                        </div>
                    </div>
                </div>
                <EtatDeVaudSignature />
                {/* "CONTACT AVEC AUTRUI" SECTION */}
                <h2 className="contact-with-other section-title mt-8 text-3xl text-[#e42313]">CONTACT AVEC AUTRUI</h2>
                <div className="radios-section max-w-2xl">
                    <div className="appreciations-text md:flex gap-5 md:justify-end font-semibold hidden">
                        <span>Très bien</span>
                        <span>Satisfaisant</span>
                        <span>À améliorer</span>
                        <span>Pas observé</span>
                    </div>
                    <div className="flex flex-col gap-6 md:gap-0">
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">À l&apos;aise dans les contacts</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="contact-easy-really-good">Très bien</label>
                                    <input name="contact-easy" value="really-good" defaultChecked={rapportStorage.comfortable == 'really-good'} onChange={(e) => updateStorageOnChange('comfortable', e.target.value)} id="contact-easy-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="contact-easy-satisfying">Satisfaisant</label>
                                    <input name="contact-easy" value="satisfying" defaultChecked={rapportStorage.comfortable == 'satisfying'} onChange={(e) => updateStorageOnChange('comfortable', e.target.value)} id="contact-easy-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="contact-easy-to-upgrade">À améliorer</label>
                                    <input name="contact-easy" value="to-upgrade" defaultChecked={rapportStorage.comfortable == 'to-upgrade'} onChange={(e) => updateStorageOnChange('comfortable', e.target.value)} id="contact-easy-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="contact-easy-not-observed">Pas observé</label>
                                    <input name="contact-easy" value="not-observed" defaultChecked={rapportStorage.comfortable == 'not-observed'} onChange={(e) => updateStorageOnChange('comfortable', e.target.value)} id="contact-easy-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Serviable</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="helpful-really-good">Très bien</label>
                                    <input name="helpful" value="really-good" defaultChecked={rapportStorage.helpful == 'really-good'} onChange={(e) => updateStorageOnChange('helpful', e.target.value)} id="helpful-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="helpful-satisfying">Satisfaisant</label>
                                    <input name="helpful" value="satisfying" defaultChecked={rapportStorage.helpful == 'satisfying'} onChange={(e) => updateStorageOnChange('helpful', e.target.value)} id="helpful-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="helpful-to-upgrade">À améliorer</label>
                                    <input name="helpful" value="to-upgrade" defaultChecked={rapportStorage.helpful == 'to-upgrade'} onChange={(e) => updateStorageOnChange('helpful', e.target.value)} id="helpful-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="helpful-not-observed">Pas observé</label>
                                    <input name="helpful" value="not-observed" defaultChecked={rapportStorage.helpful == 'not-observed'} onChange={(e) => updateStorageOnChange('helpful', e.target.value)} id="helpful-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Poli-e</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="polite-really-good">Très bien</label>
                                    <input name="polite" value="really-good" defaultChecked={rapportStorage.polite == 'really-good'} onChange={(e) => updateStorageOnChange('polite', e.target.value)} id="polite-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="polite-satisfying">Satisfaisant</label>
                                    <input name="polite" value="satisfying" defaultChecked={rapportStorage.polite == 'satisfying'} onChange={(e) => updateStorageOnChange('polite', e.target.value)} id="polite-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="polite-to-upgrade">À améliorer</label>
                                    <input name="polite" value="to-upgrade" defaultChecked={rapportStorage.polite == 'to-upgrade'} onChange={(e) => updateStorageOnChange('polite', e.target.value)} id="polite-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="polite-not-observed">Pas observé</label>
                                    <input name="polite" value="not-observed" defaultChecked={rapportStorage.polite == 'not-observed'} onChange={(e) => updateStorageOnChange('polite', e.target.value)} id="polite-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Souriant-e</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="smiling-really-good">Très bien</label>
                                    <input name="smiling" value="really-good" defaultChecked={rapportStorage.smiling == 'really-good'} onChange={(e) => updateStorageOnChange('smiling', e.target.value)} id="smiling-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="smiling-satisfying">Satisfaisant</label>
                                    <input name="smiling" value="satisfying" defaultChecked={rapportStorage.smiling == 'satisfying'} onChange={(e) => updateStorageOnChange('smiling', e.target.value)} id="smiling-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="smiling-to-upgrade">À améliorer</label>
                                    <input name="smiling" value="to-upgrade" defaultChecked={rapportStorage.smiling == 'to-upgrade'} onChange={(e) => updateStorageOnChange('smiling', e.target.value)} id="smiling-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="smiling-not-observed">Pas observé</label>
                                    <input name="smiling" value="not-observed" defaultChecked={rapportStorage.smiling == 'not-observed'} onChange={(e) => updateStorageOnChange('smiling', e.target.value)} id="smiling-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Ose poser des questions</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="asks-questions-really-good">Très bien</label>
                                    <input name="asks-questions" value="really-good" defaultChecked={rapportStorage.confidentToAsk == 'really-good'} onChange={(e) => updateStorageOnChange('confidentToAsk', e.target.value)} id="asks-questions-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="asks-questions-satisfying">Satisfaisant</label>
                                    <input name="asks-questions" value="satisfying" defaultChecked={rapportStorage.confidentToAsk == 'satisfying'} onChange={(e) => updateStorageOnChange('confidentToAsk', e.target.value)} id="asks-questions-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="asks-questions-to-upgrade">À améliorer</label>
                                    <input name="asks-questions" value="to-upgrade" defaultChecked={rapportStorage.confidentToAsk == 'to-upgrade'} onChange={(e) => updateStorageOnChange('confidentToAsk', e.target.value)} id="asks-questions-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="asks-questions-not-observed">Pas observé</label>
                                    <input name="asks-questions" value="not-observed" defaultChecked={rapportStorage.confidentToAsk == 'not-observed'} onChange={(e) => updateStorageOnChange('confidentToAsk', e.target.value)} id="asks-questions-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">Montre de l&apos;intérêt</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="shows-interest-really-good">Très bien</label>
                                    <input name="shows-interest" value="really-good" defaultChecked={rapportStorage.showInterest == 'really-good'} onChange={(e) => updateStorageOnChange('showInterest', e.target.value)} id="shows-interest-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="shows-interest-satisfying">Satisfaisant</label>
                                    <input name="shows-interest" value="satisfying" defaultChecked={rapportStorage.showInterest == 'satisfying'} onChange={(e) => updateStorageOnChange('showInterest', e.target.value)} id="shows-interest-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="shows-interest-to-upgrade">À améliorer</label>
                                    <input name="shows-interest" value="to-upgrade" defaultChecked={rapportStorage.showInterest == 'to-upgrade'} onChange={(e) => updateStorageOnChange('showInterest', e.target.value)} id="shows-interest-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="shows-interest-not-observed">Pas observé</label>
                                    <input name="shows-interest" value="not-observed" defaultChecked={rapportStorage.showInterest == 'not-observed'} onChange={(e) => updateStorageOnChange('showInterest', e.target.value)} id="shows-interest-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                        <div className="radio-inputs-and-titles flex flex-col w-full md:flex-row">
                            <h3 className="input-title font-bold text-xl md:text-base md:font-normal">S&apos;exprime clairement</h3>
                            <div className="flex max-[369px]:flex-col min-[370px]:flex-wrap md:flex-row gap-2 md:gap-0 md:ml-auto mr-auto md:mr-0">
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="express-clearly-really-good">Très bien</label>
                                    <input name="express-clearly" value="really-good" defaultChecked={rapportStorage.expressClairly == 'really-good'} onChange={(e) => updateStorageOnChange('expressClairly', e.target.value)} id="express-clearly-really-good" className="radio-input md:mr-[73px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="express-clearly-satisfying">Satisfaisant</label>
                                    <input name="express-clearly" value="satisfying" defaultChecked={rapportStorage.expressClairly == 'satisfying'} onChange={(e) => updateStorageOnChange('expressClairly', e.target.value)} id="express-clearly-satisfying" className="radio-input md:mr-[85px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="express-clearly-to-upgrade">À améliorer</label>
                                    <input name="express-clearly" value="to-upgrade" defaultChecked={rapportStorage.expressClairly == 'to-upgrade'} onChange={(e) => updateStorageOnChange('expressClairly', e.target.value)} id="express-clearly-to-upgrade" className="radio-input md:mr-[87px]" type="radio" />
                                </div>
                                <div className="flex flex-[1_1_45%] md:flex-none gap-2">
                                    <label className="block md:hidden" htmlFor="express-clearly-not-observed">Pas observé</label>
                                    <input name="express-clearly" value="not-observed" defaultChecked={rapportStorage.expressClairly == 'not-observed'} onChange={(e) => updateStorageOnChange('expressClairly', e.target.value)} id="express-clearly-not-observed" className="radio-input md:mr-7" type="radio" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="observations-remarks mt-6 max-w-4xl whitespace-nowrap">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row whitespace-nowrap w-full">
                            Remarques / Observations&nbsp;
                            <textarea className="w-full box-border resize-none overflow-y-hidden" defaultValue={rapportStorage.contactRemarks} onChange={(e) => updateStorageOnChange('contactRemarks', e.target.value)} placeholder={".".repeat(500)}></textarea>
                        </div>
                    </div>
                </div>
                {/* "AVIS DE LA PERSONNE RESPONSABLE DU STAGE" SECTION */}
                <h2 className="section-title mt-8 text-3xl text-[#e42313]">AVIS DE LA PERSONNE RESPONSABLE DU STAGE</h2>
                <div className="text-semibold mt-4">
                    <p className="mb-4">A votre avis, le projet de formation dans ce métier est :</p>
                    <div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="apprenticeship-job" value="adequate" defaultChecked={rapportStorage.apprenticeshipJob == 'adequate'} onChange={(e) => updateStorageOnChange('apprenticeshipJob', e.target.value)} id="apprenticeship-job-adequate" className="radio-input" type="radio" />
                            <label htmlFor="apprenticeship-job-adequate">Adéquat</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="apprenticeship-job" value="to-precise" defaultChecked={rapportStorage.apprenticeshipJob == 'to-precise'} onChange={(e) => updateStorageOnChange('apprenticeshipJob', e.target.value)} id="apprenticeship-job-to-precise" className="radio-input" type="radio" />
                            <label htmlFor="apprenticeship-job-to-precise">À préciser</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="apprenticeship-job" value="not-adequate" defaultChecked={rapportStorage.apprenticeshipJob == 'not-adequate'} onChange={(e) => updateStorageOnChange('apprenticeshipJob', e.target.value)} id="apprenticeship-job-not-adequate" className="radio-input" type="radio" />
                            <label htmlFor="apprenticeship-job-not-adequate">Pas adéquat</label>
                        </div>
                    </div>
                </div>
                <div className="observations-remarks mt-6 max-w-4xl whitespace-nowrap">
                    <div className="w-full">
                        <div className="flex whitespace-nowrap w-full">
                            Remarques&nbsp;
                            <input type="text" className="w-full box-border" defaultValue={rapportStorage.opinionRemarks} onChange={(e) => updateStorageOnChange('opinionRemarks', e.target.value)} placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                </div>
                <div className="less-margin-top text-semibold mt-12 max-w-4xl">
                    <p className="mb-4">Que conseillez-vous à ce ou à cette stagiaire par rapport à son projet ?</p>
                    <div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="tip-to-internship-project" value="find-apprenticeship" defaultChecked={rapportStorage.adviceProject == 'find-apprenticeship'} onChange={(e) => updateStorageOnChange('adviceProject', e.target.value)} id="tip-to-internship-project-find-apprenticeship" className="radio-input" type="radio" />
                            <label htmlFor="tip-to-internship-project-find-apprenticeship">Chercher une place d&apos;apprentissage</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="tip-to-internship-project" value="another-internship" defaultChecked={rapportStorage.adviceProject == 'another-internship'} onChange={(e) => updateStorageOnChange('adviceProject', e.target.value)} id="tip-to-internship-project-another-internship" className="radio-input" type="radio" />
                            <label htmlFor="tip-to-internship-project-another-internship">Faire un autre stage</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="tip-to-internship-project" value="explore-jobs" defaultChecked={rapportStorage.adviceProject == 'explore-jobs'} onChange={(e) => updateStorageOnChange('adviceProject', e.target.value)} id="tip-to-internship-project-explore-jobs" className="radio-input" type="radio" />
                            <label htmlFor="tip-to-internship-project-explore-jobs">Continuer à explorer les métiers</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="tip-to-internship-project" value="other" defaultChecked={rapportStorage.adviceProject == 'other'} onChange={(e) => updateStorageOnChange('adviceProject', e.target.value)} id="tip-to-internship-project-other" className="radio-input" type="radio" />
                            <label htmlFor="tip-to-internship-project-other" className="whitespace-nowrap">Autre (préciser)</label>
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                </div>
                <div className="less-margin-top text-semibold mt-12 max-w-4xl">
                    <p className="mb-4">Dans le cas où ce ou cette stagiaire envisage une formation dans ce métier, quels conseils particuliers lui donneriez-vous ?</p>
                    <textarea className="observations-remarks resize-none w-full" defaultValue={rapportStorage.advicesRemarks} onChange={(e) => updateStorageOnChange('advicesRemarks', e.target.value)} placeholder={".".repeat(500)}></textarea>
                </div>
                <div className="less-margin-top text-semibold mt-12 max-w-4xl">
                    <p className="mb-4">Si vous envisagiez d’engager un-e apprenti-e, prendriez-vous ce ou cette stagiaire en formation ?</p>
                    <div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="take-this-intern" value="yes" defaultChecked={rapportStorage.considerCandidate == 'yes'} onChange={(e) => updateStorageOnChange('considerCandidate', e.target.value)} id="take-this-intern-yes" className="radio-input" type="radio" />
                            <label htmlFor="take-this-intern-yes">Oui. Pourquoi ?</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="take-this-intern" value="maybe" defaultChecked={rapportStorage.considerCandidate == 'maybe'} onChange={(e) => updateStorageOnChange('considerCandidate', e.target.value)} id="take-this-intern-maybe" className="radio-input" type="radio" />
                            <label htmlFor="take-this-intern-maybe">Peut-être. Pourquoi ?</label>
                        </div>
                        <div className="dotted-input-text flex flex-row gap-2">
                            <input name="take-this-intern" value="no" defaultChecked={rapportStorage.considerCandidate == 'no'} onChange={(e) => updateStorageOnChange('considerCandidate', e.target.value)} id="take-this-intern-no" className="radio-input" type="radio" />
                            <label htmlFor="take-this-intern-no">Non. Pourquoi ?</label>
                        </div>
                    </div>
                </div>
                <div className="text-semibold mt-4 max-w-4xl">
                    <textarea className="observations-remarks resize-none w-full" rows={2} defaultValue={rapportStorage.considerCandidatesRemarks} onChange={(e) => updateStorageOnChange('considerCandidatesRemarks', e.target.value)} placeholder={".".repeat(500)}></textarea>
                </div>
                <div className="take-time flex flex-col lg:flex-row lg:max-w-4xl mt-12 gap-16">
                    <div className="lg:w-3/5">
                        Avez-vous pu prendre du temps avec le ou la stagiaire pour faire le bilan
                        des quelques jours passés dans votre entreprise ou établissement ?
                        <div className="flex gap-2 mt-4">
                            <div className="date-signature flex flex-col gap-10">
                                <div className="dotted-input-text flex flex-row gap-2">
                                    <input name="take-time" value="yes" defaultChecked={rapportStorage.bilanStage == 'yes'} onChange={(e) => updateStorageOnChange('bilanStage', e.target.value)} id="take-time-yes" className="radio-input" type="radio" />
                                    <label htmlFor="take-time-yes">Oui</label>
                                </div>
                                <div className="date-div dotted-input-text flex flex-row gap-2">
                                    <label htmlFor="date">Date</label>
                                    <input name="date" defaultValue={rapportStorage.fillUpDate} onChange={(e) => updateStorageOnChange('fillUpDate', e.target.value)} id="date" className="w-2/3" type="text" placeholder={".".repeat(500)} />
                                </div>
                            </div>
                            <div className="date-signature flex flex-col gap-10">
                                <div className="dotted-input-text flex flex-row gap-2">
                                    <input name="take-time" value="no" defaultChecked={rapportStorage.bilanStage == 'no'} onChange={(e) => updateStorageOnChange('bilanStage', e.target.value)} id="take-time-no" className="radio-input" type="radio" />
                                    <label htmlFor="take-time-no">Non</label>
                                </div>
                                <div className="dotted-input-text flex flex-row gap-2">
                                    <label htmlFor="signature">Signature</label>
                                    <div>
                                        <canvas className="border-2 mb-2" id="signature-pad" width="250" height="70" ref={canvasRef}></canvas>
                                        <button
                                            onClick={() => signaturePadRef.current?.clear()}
                                            className="signature-buttons bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 transition ease-in-out mr-4"
                                        >
                                            Réinitialiser
                                        </button>
                                        <button
                                            onClick={() => signatureImageFile.current?.click()}
                                            className="signature-buttons bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 transition ease-in-out"
                                        >
                                            Importer image
                                        </button>
                                        <input
                                            style={{ display: "none" }}
                                            accept=".png, .jpg, .jpeg"
                                            ref={signatureImageFile}
                                            onChange={handleSignatureUpload}
                                            type="file"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intern-note-box dotted-box border-[3px] border-dotted border-[#e42313] px-4 py-3 max-w-md lg:w-2/5 lg:h-[110px]">
                        <h3 className="intern-note-title text-base font-semibold text-[#eb2313]">NOTE À L’INTENTION DU / DE LA STAGIAIRE</h3>
                        <p className="text-sm p-0">Ce rapport de stage est à conserver précieusement.
                            Une copie peut être jointe au dossier de candidature pour une place d’apprentissage.
                        </p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <EtatDeVaudSignature />
                    <div className="version-promotion hidden mt-4 text-sm">
                        Généré via&nbsp;
                        <a 
                            href="https://go.epfl.ch/rds"
                            className="text-blue-600 hover:underline"
                        >
                            https://go.epfl.ch/rds
                        </a>,
                        v{packageJson.version}
                    </div>
                </div>
            </div>
        )
    )
}
