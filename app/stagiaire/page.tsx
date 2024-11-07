import React from "react";
import Image from "next/image";
import EtatDeVaudSignature from "../components/EtatDeVaudSignature";

export default function Page() {
    return (
        <div className="mx-4 my-4 md:mx-14 md:my-14">
            {/* TITLES & DESCRIPTION */}
            <h1 className="text-4xl text-[#e42313]">RAPPORT DE STAGE</h1>
            <h1 className="text-4xl text-[#e42313] font-semibold">STAGIAIRE</h1>
            <p id="main-description" className="mt-8">
                Tu as effectué un stage en vue d’une formation professionnelle initiale.<br />
                Prends la peine de remplir ce rapport de stage: tes impressions et tes observations seront d’une grande utilité pour la suite de tes démarches.
            </p>
            {/* "STAGIAIRE" SECTION */}
            <div className="dotted-box mt-6 border-[3px] border-dotted border-[#e42313] px-6 py-3 max-w-4xl">
                <h2 className="text-3xl text-[#e42313]">STAGIAIRE</h2>
                <div className="flex flex-col md:flex-row md:gap-5">                    
                    <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Nom&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Prénom&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Classe&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Établissement&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Adresse&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                N° postal&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Localité&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Téléphone&nbsp;
                            <input type="email" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                </div>
                <div className="internship-job-of flex flex-col sm:flex-row gap-5 mt-8">
                    <div className="w-full">
                        <div className="dotted-input-text flex flex-col md:flex-row whitespace-nowrap w-full">
                            Stage dans le métier de&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                    <div className="flex flex-col min-[450px]:flex-row gap-3 w-full">
                        <div className="dotted-input-text flex whitespace-nowrap w-1/2 max-[450px]:w-full">
                            du&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap w-1/2 max-[450px]:w-full">
                            au&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                </div>
            </div>
            {/* "ENTREPRISE" SECTION */}
            <div className="dotted-box mt-4 border-[3px] border-dotted border-[#e42313] px-6 py-3 max-w-4xl">
                <h2 className="text-3xl text-[#e42313]">ENTREPRISE - RESPONSABLE DU STAGE</h2>
                <div className="flex flex-col md:flex-row md:gap-5">                    
                    <div className="dotted-input-under-title mt-5 flex flex-col gap-3 md:w-1/2">
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Nom de l&apos;entreprise&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Nom du responsable&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap">
                            E-mail&nbsp;
                            <input type="email" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                    <div className="dotted-input-under-title mt-3 md:mt-5 flex flex-col gap-3 md:w-1/2">
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Adresse&nbsp;
                            <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="dotted-input-text flex whitespace-nowrap">
                                N° postal&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                            <div className="dotted-input-text flex whitespace-nowrap">
                                Localité&nbsp;
                                <input type="text" className="w-full box-border" placeholder={".".repeat(500)}></input>
                            </div>
                        </div>
                        <div className="dotted-input-text flex whitespace-nowrap">
                            Téléphone&nbsp;
                            <input type="email" className="w-full box-border" placeholder={".".repeat(500)}></input>
                        </div>
                    </div>
                </div>
            </div>
            {/* "DÉROULEMENT DU STAGE " SECTION */}
            <h2 className="section-title mt-8 text-3xl text-[#e42313]">DÉROULEMENT DU STAGE</h2>
            <div className="progress-internship-div flex max-[930px]:w-fit min-[930px]:max-w-4xl flex-col min-[931px]:flex-row min-[930px]:justify-between mt-5">
                <div className="flex flex-col">
                    <div className="flex gap-3 ml-auto mb-1">
                        <Image src="smiling_face.png" className="smileys-image mr-0.5" alt="Smiling face emoji" height={20} width={20}/>
                        <Image src="slightly_smiling_face.png" className="smileys-image mr-0.5" alt="Slightly smiling face emoji" height={20} width={20}/>
                        <Image src="sad_face.png" className="smileys-image mr-0.5" alt="Sad face emoji" height={20} width={20}/>
                        <Image src="really_sad_face.png" className="smileys-image -mr-1" alt="Really sad face emoji" height={20} width={20}/>
                    </div>
                    <div className="w-full">
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Impression générale</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="general-impression" id="general-impression-really-good" />
                                <input type="radio" name="general-impression" id="general-impression-good" />
                                <input type="radio" name="general-impression" id="general-impression-bad" />
                                <input type="radio" name="general-impression" id="general-impression-really-bad" />
                            </div>
                        </div>
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Ambiance</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="atmosphere" id="atmosphere-really-good" />
                                <input type="radio" name="atmosphere" id="atmosphere-good" />
                                <input type="radio" name="atmosphere" id="atmosphere-bad" />
                                <input type="radio" name="atmosphere" id="atmosphere-really-bad" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="smileys-images-div flex gap-3 ml-auto mb-1 max-[930px]:hidden">
                        <Image src="smiling_face.png" className="smileys-image mr-0.5" alt="Smiling face emoji" height={20} width={20}/>
                        <Image src="slightly_smiling_face.png" className="smileys-image mr-0.5" alt="Slightly smiling face emoji" height={20} width={20}/>
                        <Image src="sad_face.png" className="smileys-image mr-0.5" alt="Sad face emoji" height={20} width={20}/>
                        <Image src="really_sad_face.png" className="smileys-image -mr-1" alt="Really sad face emoji" height={20} width={20}/>
                    </div>
                    <div className="w-full">
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Métier</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="job" id="job-really-good" />
                                <input type="radio" name="job" id="job-good" />
                                <input type="radio" name="job" id="job-bad" />
                                <input type="radio" name="job" id="job-really-bad" />
                            </div>
                        </div>
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Entreprise</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="company" id="company-really-good" />
                                <input type="radio" name="company" id="company-good" />
                                <input type="radio" name="company" id="company-bad" />
                                <input type="radio" name="company" id="company-really-bad" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="smileys-images-div flex gap-3 ml-auto mb-1 max-[930px]:hidden">
                        <Image src="smiling_face.png" className="smileys-image mr-0.5" alt="Smiling face emoji" height={20} width={20}/>
                        <Image src="slightly_smiling_face.png" className="smileys-image mr-0.5" alt="Slightly smiling face emoji" height={20} width={20}/>
                        <Image src="sad_face.png" className="smileys-image mr-0.5" alt="Sad face emoji" height={20} width={20}/>
                        <Image src="really_sad_face.png" className="smileys-image -mr-1" alt="Really sad face emoji" height={20} width={20}/>
                    </div>
                    <div className="w-full">
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Informations (reçues)</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="received-informations" id="received-informations-really-good" />
                                <input type="radio" name="received-informations" id="received-informations-good" />
                                <input type="radio" name="received-informations" id="received-informations-bad" />
                                <input type="radio" name="received-informations" id="received-informations-really-bad" />
                            </div>
                        </div>
                        <div className="label-radios-div flex gap-5">
                            <label className="dotted-input-text">Encadrement et suivi</label>
                            <div className="flex gap-5 ml-auto">
                                <input type="radio" name="supervision" id="supervision-really-good" />
                                <input type="radio" name="supervision" id="supervision-good" />
                                <input type="radio" name="supervision" id="supervision-bad" />
                                <input type="radio" name="supervision" id="supervision-really-bad" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* "TÂCHES EFFECTUÉES" SECTION */}
            <div className="flex mt-8 max-w-4xl">
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-r border-black px-2 py-2 whitespace-nowrap">J&apos;ai fait</span>
                    <div className="flex pt-4 flex-col gap-3 border-r border-black">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-r border-black px-2 py-2 whitespace-nowrap">J&apos;ai observé</span>
                    <div className="flex pt-4 flex-col gap-3 border-r border-black">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-r border-black px-2 py-2 whitespace-nowrap">Liste des activités</span>
                    <div className="flex flex-col pt-3 border-r border-black px-3 -h-2">
                        <input className="activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 w-60 activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 activities-input" type="text" placeholder={".".repeat(500)} />
                        <input className="mt-0.5 activities-input" type="text" placeholder={".".repeat(500)} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-black px-2 py-2 whitespace-nowrap">J&apos;ai aimé</span>
                    <div className="flex pt-4 flex-col gap-3">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-r border-black px-2 py-2 whitespace-nowrap">J&apos;ai moins aimé</span>
                    <div className="flex pt-4 flex-col gap-3 border-r border-black">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-black px-2 py-2 whitespace-nowrap">J&apos;ai trouvé facile</span>
                    <div className="flex pt-4 flex-col gap-3">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="dotted-input-text border-b border-black px-2 py-2 whitespace-nowrap">J&apos;ai trouvé difficile</span>
                    <div className="flex pt-4 flex-col gap-3">
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
            <div className="observations-remarks-activities-list mt-6 max-w-4xl whitespace-nowrap">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row whitespace-nowrap w-full">
                        Remarques&nbsp;
                        <textarea className="w-full box-border resize-none overflow-y-hidden" placeholder={".".repeat(500)}></textarea>
                    </div>
                </div>
            </div>
            <EtatDeVaudSignature />
            <div className="flex flex-col sm:flex-row gap-4 pt-12 sm:max-w-4xl">
                <div className="flex flex-col sm:w-1/2 gap-6">
                    <div>
                        A ton avis, quelles sont les qualités nécessaires à l&apos;exercice de cette profession ?
                        <textarea className="observations-remarks w-full box-border resize-none overflow-y-hidden" placeholder={".".repeat(500)}></textarea>
                    </div>
                    <div>
                        As-tu l&apos;impression de posséder ces qualités ?
                        <div className="having-qualities-radios-div flex flex-col min-[950px]:flex-row min-[950px]:gap-5">
                            <div className="having-qualities-radio-label flex gap-2">
                                <input type="radio" name="having-those-qualities" id="yes-mostly" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="yes-mostly">Oui, la plupart</label>
                            </div>
                            <div className="having-qualities-radio-label flex gap-2">
                                <input type="radio" name="having-those-qualities" id="some-having-those-qualities" />
                                <label className="radio-inpu    t-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="some-having-those-qualities">Certaines</label>
                            </div>
                            <div className="having-qualities-radio-label flex gap-2">
                                <input type="radio" name="having-those-qualities" id="no-having-those-qualities" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="no-having-those-qualities">Non</label>
                            </div>
                            <div className="having-qualities-radio-label flex gap-2">
                                <input type="radio" name="having-those-qualities" id="dont-know-having-those-qualities" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="dont-know-having-those-qualities">Je ne sais pas</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        A ton avis, quelles sont les matières scolaires importantes dans cette profession ?
                        <textarea className="observations-remarks w-full box-border resize-none overflow-y-hidden" placeholder={".".repeat(500)}></textarea>
                    </div>
                </div>
                <div className="flex flex-col sm:w-1/2 gap-6">
                    <div>
                        Que devrais-tu développer ou améliorter pour réussir dans ce métier ?
                        <textarea className="observations-remarks w-full box-border resize-none overflow-y-hidden" placeholder={".".repeat(500)}></textarea>
                    </div>
                    <div>
                        Quels sont les remarques ou commentaires qui t&apos;ont été faits pendant le stage ?
                        <textarea className="observations-remarks w-full box-border resize-none overflow-y-hidden" placeholder={".".repeat(500)}></textarea>
                    </div>
                    <div className="-mt-1">
                        Y a-t-il un test d&apos;admission dans cette profession ?
                        <div className="admission-test-radios-div flex flex-col min-[830px]:flex-row min-[830px]:gap-24">
                            <div className="flex gap-2">
                                <input type="radio" name="admission-test" id="yes-admission-test" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="yes-admission-test">Oui</label>
                            </div>
                            <div className="flex gap-2">
                                <input type="radio" name="admission-test" id="no-admission-test" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="no-admission-test">Non</label>
                            </div>
                            <div className="flex gap-2">
                                <input type="radio" name="admission-test" id="dont-know-admission-test" />
                                <label className="radio-input-label pt-0.5 dotted-input-text whitespace-nowrap" htmlFor="dont-know-admission-test">Je ne sais pas</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* "CONCLUSION" SECTION */}
            <div>
                <h2 className="section-title mt-24 text-3xl text-[#e42313]">CONCLUSION</h2>
                <div className="flex flex-col min-[586px]:flex-row mt-3 max-w-2xl justify-between">
                    Estimes-tu avoir assez d&apos;informations sur cette profession ?
                    <div className="flex gap-12">
                        <div className="flex gap-2">
                            <input type="radio" name="enough-informations-job" id="enough-informations-job-yes" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="enough-informations-job-yes">Oui</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="enough-informations-job" id="enough-informations-job-no" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="enough-informations-job-no">Non</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-[586px]:flex-row mt-3 max-w-2xl justify-between">
                    Le métier correspond-il à l’idée que tu t&apos;en faisais ?
                    <div className="flex gap-12">
                        <div className="flex gap-2">
                            <input type="radio" name="job-match-idea" id="job-match-idea-yes" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="job-match-idea-yes">Oui</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="job-match-idea" id="job-match-idea-no" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="job-match-idea-no">Non</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-[586px]:flex-row mt-3 max-w-2xl justify-between">
                    Ce stage t&apos;a-t-il permis de prendre une décision ?
                    <div className="flex gap-12">
                        <div className="flex gap-2">
                            <input type="radio" name="job-match-idea" id="job-match-idea-yes" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="job-match-idea-yes">Oui</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="job-match-idea" id="job-match-idea-no" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="job-match-idea-no">Non</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-3 gap-3">
                    Si oui, laquelle ?
                    <div className="flex gap-2">
                        <input type="radio" name="if-yes-which-one" id="if-yes-which-one-thinking-apprenticeship" />
                        <label className="dotted-input-text radio-input-label pt-0.5" htmlFor="if-yes-which-one-thinking-apprenticeship">J&apos;envisage un apprentissage dans ce métier</label>
                    </div>
                    <div className="flex gap-2 max-w-4xl">
                        <input type="radio" name="if-yes-which-one" id="if-yes-which-one-still-hesitating" />
                        <div className="flex flex-col min-[455px]:flex-row gap-2 w-full">
                            <label className="dotted-input-text radio-input-label whitespace-nowrap pt-0.5" htmlFor="if-yes-which-one-still-hesitating">J&apos;hésite encore. Pourquoi ?</label>
                            <input type="text" className="w-full" placeholder={".".repeat(500)} />
                        </div>
                    </div>
                    <div className="flex gap-2 max-w-4xl">
                        <input type="radio" name="if-yes-which-one" id="if-yes-which-one-giving-up-this-job" />
                        <div className="flex flex-col min-[570px]:flex-row gap-2 w-full">
                            <label className="dotted-input-text radio-input-label whitespace-nowrap pt-0.5" htmlFor="if-yes-which-one-giving-up-this-job">J&apos;abandonne cette profession. Pourquoi ?</label>
                            <input type="text" className="observations-remarks w-full" placeholder={".".repeat(500)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="less-margin-conclusion mt-12">
                <div className="flex flex-col min-[586px]:flex-row mt-3 max-w-2xl justify-between">
                    L&apos;entreprise t&apos;a-t-elle proposé une place d&apos;apprentissage ?
                    <div className="flex gap-12">
                        <div className="flex gap-2">
                            <input type="radio" name="company-offered-apprenticeship" id="company-offered-apprenticeship-yes" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="company-offered-apprenticeship-yes">Oui</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="company-offered-apprenticeship" id="company-offered-apprenticeship-no" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="company-offered-apprenticeship-no">Non</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-[586px]:flex-row mt-3 max-w-2xl justify-between">
                    Penses-tu à un autre métier ?
                    <div className="flex gap-12">
                        <div className="flex gap-2">
                            <input type="radio" name="thinking-other-job" id="thinking-other-job-yes" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="thinking-other-job-yes">Oui</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="thinking-other-job" id="thinking-other-job-no" />
                            <label className="radio-input-label pt-0.5 dotted-input-text" htmlFor="thinking-other-job-no">Non</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-[275px]:flex-row mt-3 max-w-4xl">
                    <span className="whitespace-nowrap mr-2">Si oui lequel ?</span>
                    <input type="text" className="observations-remarks w-full" placeholder={".".repeat(500)} />
                </div>
            </div>
            <div className="less-margin-conclusion flex flex-col gap-3 mt-12">
                Quelles seront tes prochaines démarches ?
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-find-out-other-jobs" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-find-out-other-jobs">Me renseigner sur d&apos;autres métiers</label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-find-other-internship" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-find-other-internship">Chercher un autre stage</label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-find-out-school-open-doors" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-find-out-school-open-doors">Me renseigner sur les portes ouvertes des écoles</label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-find-out-admission-exams" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-find-out-admission-exams">Me renseigner sur les examens d&apos;admission</label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-prepare-postulation" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-prepare-postulation">Préparer mon dossier de postulation</label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="next-steps-consult-apprenticeship-exchange" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-consult-apprenticeship-exchange">Consulter la bourse des places d&apos;apprentissage</label>
                </div>
                <div className="flex gap-2 max-w-4xl">
                    <input type="checkbox" id="next-steps-other" />
                    <label className="dotted-input-text pt-0.5" htmlFor="next-steps-other">Autre</label>
                    <input type="text" className="w-full" placeholder={".".repeat(500)} />
                </div>
            </div>
            <EtatDeVaudSignature />
        </div>
    )
}
