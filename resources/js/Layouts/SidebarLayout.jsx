import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className="flex flex-row h-screen w-screen gap-x-7 overflow-hidden">
            <Card className="h-full w-full min-w-[18rem] max-w-[19rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        SAOCP
                    </Typography>
                </div>
                <List>
                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 1 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5 mr-2" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    RBAC
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Add Role
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Assign User to Role
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Assign Routes to Role
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 2 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    E-Commerce
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Orders
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Products
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-50" />
                    <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Inbox
                        <ListItemSuffix>
                            <Chip
                                value="14"
                                size="sm"
                                variant="ghost"
                                color="blue-gray"
                                className="rounded-full"
                            />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem> */}
                </List>
            </Card>
            <div className=" p-10 overflow-y-auto">
                <Card className="w-full flex-row">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-2/5 shrink-0 rounded-r-none"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography
                            variant="h6"
                            color="gray"
                            className="mb-4 uppercase"
                        >
                            startups
                        </Typography>
                        <Typography
                            variant="h4"
                            color="blue-gray"
                            className="mb-2"
                        >
                            Lyft launching cross-platform service this week
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Like so many organizations these days, Autodesk is a
                            company in transition. It was until recently a
                            traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part
                            of the story
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button
                                variant="text"
                                className="flex items-center gap-2"
                            >
                                Learn More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nisi explicabo quia voluptas tempora dicta vel
                            maxime ea ad exercitationem blanditiis perferendis
                            vitae, vero fugit similique ab sapiente ex
                            reiciendis quibusdam aliquam! Pariatur
                            necessitatibus quaerat id, eos assumenda
                            perspiciatis minima quisquam ipsum quidem dolor
                            aspernatur ducimus obcaecati consequatur facilis.
                            Laborum quo hic quam est molestias exercitationem
                            inventore. Obcaecati at reprehenderit dolorum in
                            fugiat quam magni consequuntur, nam fugit fuga
                            exercitationem totam sed, repellendus, non
                            consectetur sapiente dolore rerum laborum ut ea.
                            Nihil, provident? Commodi cum odit eos reprehenderit
                            quisquam dolor, mollitia praesentium est quam saepe
                            a, ad fugiat accusantium voluptate laudantium quod
                            aut quae, beatae similique nemo molestias aliquam!
                            Rerum alias omnis illo deleniti provident, dolor
                            consequuntur ipsa quia, repellendus, inventore
                            suscipit sint tempore assumenda praesentium
                            laudantium magnam sunt voluptates dolorum! Minima
                            eos mollitia officiis ab ratione excepturi
                            asperiores natus sed tempore ipsum, voluptate velit
                            numquam id nisi perspiciatis fugiat distinctio quo
                            iste voluptates iure possimus porro laboriosam?
                            Expedita aspernatur cupiditate optio, eligendi
                            aliquid commodi id animi, neque temporibus nam,
                            nesciunt ipsam itaque odio vero suscipit similique!
                            Nulla nisi magni iure ab, nemo tempora temporibus
                            corporis quam soluta ea quasi eos commodi in ex
                            minima atque tenetur vel aperiam corrupti. Magni
                            inventore alias enim blanditiis fugiat tenetur
                            ipsam, nostrum eveniet quibusdam non aliquam
                            doloremque id nulla sunt culpa molestiae deleniti.
                            Temporibus tenetur sapiente voluptatibus quod
                            incidunt corrupti inventore officiis asperiores
                            doloremque numquam doloribus dignissimos voluptatum,
                            voluptates velit? Vitae, autem odio corrupti
                            explicabo officia fuga dolor quod perspiciatis hic,
                            blanditiis accusantium voluptate cumque magnam
                            libero quibusdam tempore ipsam maxime? Itaque nulla
                            odit iusto perferendis, earum facere, culpa
                            repellendus dolore deleniti harum ullam distinctio
                            illum hic beatae ea placeat iste. Minus soluta,
                            tempora explicabo nobis fugit laudantium velit.
                            Possimus, adipisci. Nulla laborum sint quisquam
                            saepe dignissimos fugit officia nemo autem harum vel
                            minima dolores excepturi dicta illum obcaecati
                            sapiente consectetur eos magni vero error magnam,
                            sit, consequatur cupiditate molestias? Facere
                            nesciunt fugiat, ut molestias sunt nobis, suscipit
                            temporibus ipsam fuga dolorem aliquam tenetur quas
                            mollitia explicabo veniam et ea veritatis tempore
                            adipisci. Perspiciatis reprehenderit fugiat cumque
                            suscipit, sunt a expedita amet quisquam minus magnam
                            quam iusto quas et velit neque nesciunt dolorem
                            fugit voluptate magni! Soluta itaque accusantium
                            dolorem dolores eligendi repudiandae corporis quam
                            cupiditate, excepturi vel delectus sunt officia
                            perferendis unde omnis ipsa ab asperiores est animi
                            quo mollitia, in veritatis blanditiis officiis? Quod
                            quasi deserunt iure rerum libero voluptates a,
                            blanditiis beatae enim esse quis veritatis alias at.
                            Nesciunt officia rerum dolor repellat odit. Delectus
                            adipisci iusto itaque facere illum accusamus
                            distinctio eum nemo repellendus pariatur? Officia
                            laborum distinctio cumque. Fugit voluptas repellat
                            iure, ipsa earum consequuntur non nostrum corporis
                            nulla veritatis repudiandae quasi tempore eius totam
                            cumque eveniet unde. Quos dolore voluptatibus
                            ducimus quasi sunt ut amet error. Maxime recusandae
                            odit ipsa tenetur cupiditate, quam, temporibus
                            debitis ut repellat commodi, quod accusamus officia
                            aliquid. Labore recusandae unde accusamus enim sunt
                            beatae sit distinctio quaerat, libero rem commodi
                            fugiat laudantium ipsam ducimus saepe. Expedita
                            laudantium, fugiat nihil iure voluptate modi velit
                            tempore, sit fugit, quis nemo ipsam minus dolor
                            eius. Dolor dolorem dolore nulla voluptatum aut,
                            omnis illum assumenda ullam quod nemo velit sequi
                            nostrum incidunt molestias corporis culpa sint neque
                            dicta unde? Odio nobis autem eos vel quia, non
                            asperiores repellendus nostrum officia nam quasi
                            veritatis sapiente adipisci optio iure expedita
                            nihil doloribus? Ut labore neque consectetur dolore
                            fugiat temporibus. Nesciunt iure veniam, eum itaque
                            repellat quae quod optio exercitationem! Rerum
                            mollitia reiciendis vero perferendis nesciunt
                            deserunt assumenda tenetur itaque quia at asperiores
                            nihil repudiandae, magnam explicabo provident! Quia
                            enim reprehenderit voluptatem labore unde
                            dignissimos aliquid modi, delectus officia eum nobis
                            omnis, vero fugiat est nisi perspiciatis dolores
                            laudantium recusandae non? Modi voluptates, dolor
                            hic delectus consequatur nihil! Neque quae ex
                            veritatis, sapiente laudantium totam impedit
                            explicabo, iure iusto, dolorum quis nobis provident
                            exercitationem consequatur aliquam. Eaque eius earum
                            a illum porro. Sequi voluptas repellat et asperiores
                            expedita id commodi. Quaerat impedit rem
                            voluptatibus nulla soluta distinctio hic cupiditate
                            pariatur maiores a! Alias quos quas eligendi? Earum
                            nemo velit fuga quaerat est error autem, dolorum in
                            voluptates expedita, quasi aliquam sit tenetur
                            laboriosam impedit adipisci quia delectus quam
                            ducimus laborum? Animi officia, aliquam sit ullam
                            natus et, doloribus mollitia expedita excepturi
                            totam, eligendi molestiae enim sint! Ullam laborum,
                            vel explicabo laboriosam tenetur voluptatem,
                            perferendis, consequatur voluptate soluta autem
                            minima! Nobis provident officiis ipsam obcaecati
                            itaque enim totam officia, deleniti inventore
                            distinctio repellat placeat veniam, fugit sed ut
                            consequuntur tenetur. Excepturi ipsam, assumenda
                            aspernatur iure vero minus ratione, obcaecati
                            similique explicabo quae, velit inventore! Sapiente
                            velit sequi aut autem delectus magnam est atque
                            consequatur praesentium quo, ducimus nobis similique
                            ab dicta ut neque quas. Hic, labore. Laborum, sunt
                            dolores provident minima quaerat rem ut molestiae
                            ullam. A reprehenderit quo magnam minus accusamus
                            eos, quod saepe aperiam nam corrupti praesentium,
                            adipisci in consequuntur blanditiis doloremque id
                            sequi dolore? Perferendis quos voluptas quas
                            deserunt maiores hic rerum in totam culpa quis
                            veniam eveniet vitae officia dolores molestiae
                            incidunt sit, exercitationem facere illo
                            necessitatibus natus iure pariatur, accusantium
                            eaque? Quidem, quaerat. Iusto voluptatem nulla at
                            quia. Facilis obcaecati magni tempora, placeat,
                            minus velit voluptas quibusdam quisquam enim
                            reprehenderit voluptate dolores eligendi quas aut
                            pariatur sapiente dolor eos animi nobis. Sit
                            reprehenderit excepturi placeat id cumque saepe
                            voluptas mollitia dicta dolores inventore. Molestias
                            ullam facilis saepe eaque corrupti dolores quisquam
                            nostrum cupiditate, incidunt ipsa. Commodi officia
                            distinctio veritatis velit, blanditiis maiores
                            corporis esse. Est fugit saepe non quaerat
                            repudiandae! Fugit at illum possimus consequatur
                            repellat quasi amet accusamus veniam provident
                            nesciunt, soluta praesentium recusandae quod
                            aspernatur consectetur incidunt alias sapiente.
                            Doloremque at dolorem repellat similique deleniti!
                            Illo deleniti laborum voluptates doloribus quos quas
                            eligendi deserunt sed fuga natus inventore esse vero
                            perspiciatis quis ullam, aut, distinctio repudiandae
                            ex! Dignissimos nihil minima aut quibusdam deserunt
                            veritatis officia quia soluta sed odit. Iste impedit
                            tenetur nostrum vitae error! Incidunt eligendi
                            numquam ipsam, dolor quam rerum unde alias, fuga
                            impedit ducimus tempora voluptatibus, quidem
                            repellendus. Esse eveniet sunt laboriosam molestias
                            inventore suscipit ex maiores voluptate eos.
                            Excepturi, in?
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
