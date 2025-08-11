"use client"

import { useInView } from "react-intersection-observer"
import { Cpu, Building } from "lucide-react"
import { useEffect, useState } from "react"

export default function TechnicalCommittee() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log("TechnicalCommittee mounted")
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

const internationalTpcMembers = [
 { name: "Aakanksha Mitra", affiliation: "Airbnb", email: "aakanksha.mitra90@gmail.com" },
{ name: "Aayushi Pushpakant, Chaudhari", affiliation: "Charotar University of Science and Technology", email: "aayushichaudhari.ce@charusat.ac.in" },
{ name: "Abhinav Chunchu", affiliation: "Wilmington University", email: "reachachunchu@gmail.com" },
{ name: "Abhishek Agrawal", affiliation: "Indian statistical Institute, Amazon.com", email: "abhishek.agrawal.ms@gmail.com" },
{ name: "Abhyudaya Gurram", affiliation: "JPMorgan Chase & Co", email: "abhyudayagurram@gmail.com" },
{ name: "Abrar Ahmed Syed", affiliation: "Gainwell Technologies LLC", email: "abrarahmed.bi@gmail.com" },
{ name: "Aditya Sharma", affiliation: "Fidelity Investments", email: "reachadityamksharma@gmail.com" },
{ name: "Aishwarya Badlani", affiliation: "Walmart", email: "aishwarya08badlani@gmail.com" },
{ name: "Ajay V Nagrale", affiliation: "BITS Pilani", email: "reachajaynagrale@gmail.com" },
{ name: "Akshay Sharma", affiliation: "Independent Researcher", email: "akshay2885@gmail.com" },
{ name: "Amar Sinha", affiliation: "IIIT Naya Raipur", email: "amar@iiitnr.edu.in" },
{ name: "Amey Pophali", affiliation: "Credit Acceptance Corporation", email: "reachameypophali@gmail.com" },
{ name: "Ameya Gokhale", affiliation: "Walmart Connect", email: "reachameyagokhale@gmail.com" },
{ name: "Amit Shivpuja", affiliation: "Walmart", email: "shivpujaamitesh@gmail.com" },
{ name: "Anand Upendrakumar Desai", affiliation: "Microsoft", email: "anandd@microsoft.com" },
{ name: "Anasuya Vemuri", affiliation: "Huron Consulting Group", email: "anasuya.d.vemuri@gmail.com" },
{ name: "Aniket Gharpure", affiliation: "University of Chicago Booth School of Business", email: "reach.aniketg@gmail.com" },
{ name: "Anil Kumar Pantangi", affiliation: "Capgemini America Inc", email: "anil.pantangi@gmail.com" },
{ name: "Anila Gogineni", affiliation: "Google", email: "gogineaa@gmail.com" },
{ name: "Anish Agarwal", affiliation: "Snowflake", email: "agarwal.anish1991@gmail.com" },
{ name: "Ankit Pathak", affiliation: "Meta", email: "contact.ankitpathak@gmail.com" },
{ name: "Ankit Vij", affiliation: "Databricks", email: "ankit.vij1@gmail.com" },
{ name: "Anshu Kalia", affiliation: "ISBM", email: "AnshuKalia09@gmail.com" },
{ name: "Anshuman Guha", affiliation: "Freshworks", email: "guha.anshuman@gmail.com" },
{ name: "Anup Raja Sarabu", affiliation: "T-Mobile USA INC", email: "sarabuanupraja@gmail.com" },
{ name: "Anusha Katikam", affiliation: "ASTELLAS US LLC", email: "reachme.anushakatikam@gmail.com" },
{ name: "Anusha Musunuri", affiliation: "University of Texas at Dallas", email: "anu9anusha@gmail.com" },
{ name: "Arjun Bali", affiliation: "Rocket Mortgage", email: "arjun.bali2012@gmail.com" },
{ name: "Arpit Garg", affiliation: "CGI", email: "arpitgarg01@gmail.com" },
{ name: "Arun Kumar Palathumpattu Thankappan", affiliation: "Cloudwick Technologies Inc", email: "mail.arunpt@gmail.com" },
{ name: "Arun Raj Kaprakattu", affiliation: "Nokia of America Corporation", email: "arunrajkaprakattu@gmail.com" },
{ name: "Ashutosh Rana", affiliation: "Cherryroad Technologies", email: "ranaashu2321@gmail.com" },
{ name: "Avinash Terala", affiliation: "Wipfli LLP", email: "teralaavin@gmail.com" },
{ name: "Ayanabha Ghosh", affiliation: "IIT Jodhpur", email: "ag.cs@ieee.org" },
{ name: "Bhushan Balkrishna Chaudhari", affiliation: "Individual Researcher", email: "bhushan.bbc1081@gmail.com" },
{ name: "Bujjibabu Katta", affiliation: "Fidelity Investments", email: "reachbujjibabu@gmail.com" },
{ name: "Chandra Sekhara Reddy Adapa", affiliation: "LabCorp", email: "adapachandrasekharareddy@gmail.com" },
{ name: "Chandrababu C Nallapareddy", affiliation: "Capital One", email: "babunc@gmail.com" },
{ name: "Chandrashekar Reddy, Aare", affiliation: "American International Group(AIG)", email: "reachchandraare@gmail.com" },
{ name: "Charles Antony Raj", affiliation: "Collins Aerospace", email: "connect.charlesraj@gmail.com" },
{ name: "Clement Pakkam Isaac", affiliation: "University of South Florida", email: "cpakkamisaac@gmail.com" },
{ name: "Dakshaja Prakash Vaidya", affiliation: "Amazon Web Services", email: "dakshajaprakashvaidya@gmail.com" },
{ name: "Damodhar Reddy Mutayalwad", affiliation: "DevCare Solutions", email: "damodharreddymutayalwad@gmail.com" },
{ name: "Darshan Prakash Patel", affiliation: "New Quest LLC", email: "darshanpatelp01@gmail.com" },
{ name: "Derek Asir Muthurajan Caleb", affiliation: "Broadcom Inc", email: "derekasircaleb@gmail.com" },
{ name: "Dileep Kumar Hamsaneni Gopalaswamy", affiliation: "SPL Consulting Inc", email: "hamsanenid@gmail.com" },
{ name: "Gaurav Bansal", affiliation: "Amazon.com Services LLC", email: "gaurav.b.work@gmail.com" },
{ name: "Gaurav Gupta", affiliation: "Punjab technical University", email: "connect.with.ggupta@gmail.com" },
{ name: "Gaurav Naresh Mittal", affiliation: "Nordstrom", email: "gauravnareshmittal@gmail.com" },
{ name: "Gautam Tripathi", affiliation: "Amazon Web Services", email: "gautam.b.tripathi@gmail.com" },
{ name: "Geetha Shranya Bolla", affiliation: "Infostretch Corporation/Apexon", email: "geethasbolla@gmail.com" },
{ name: "Giridhar Raj Singh Chowhan", affiliation: "Microsoft", email: "giridharrajchowhan@gmail.com" },
{ name: "Gokulkumar Selvanathan", affiliation: "Super Technology Solutions Inc", email: "gokulkumarselvanathan@gmail.com" },
{ name: "Goutham Bandapati", affiliation: "Microsoft", email: "gbandapati@gmail.com" },
{ name: "Goutham Yenuganti", affiliation: "Salesforce", email: "gouthamyenu@gmail.com" },
{ name: "Gouthami Kathala", affiliation: "Sage IT INC", email: "igouthamikathala@gmail.com" },
{ name: "Govindaraja Babu Komarina", affiliation: "Yash Technologies Inc", email: "govinda.komarina@yash.com" },
{ name: "Gurunath Dasari", affiliation: "UCLA Anderson School of management", email: "reach.gurunathdasari@gmail.com" },
{ name: "Gururaj Uday Thite", affiliation: "Jasper,AI", email: "reachgururajthite@gmail.com" },
{ name: "Harpreet Singh", affiliation: "University of Chicago", email: "shsinghharpreet0@gmail.com" },
{ name: "Harshal Tripathi", affiliation: "Working in Walmart Global Tech", email: "harshal25.tripathi@gmail.com" },
{ name: "Hemish Prakashchandra Kapadia", affiliation: "Barclays Capital", email: "hemish.kapadia@gmail.com" },
{ name: "Himaja Sabbineni", affiliation: "Expedia Group", email: "himasabbineni@gmail.com" },
{ name: "Hirak Mazumdar", affiliation: "Adamas University, Kolkata, India", email: "hirakm.tech.ece@gmail.com" },
{ name: "Jagadesh Balasubramani", affiliation: "L&T Technology Services(USA)", email: "jagadeshbme@gmail.com" },
{ name: "Jagan Nalla", affiliation: "Intuceo", email: "jnallagc@gmail.com" },
{ name: "Janardhan Reddy Duvvuri", affiliation: "DFS corporate services LLC", email: "janardhanreddyduvvuri@gmail.com" },
{ name: "Janardhan Reddy Kasireddy", affiliation: "Department Of Transportation", email: "reachjanardhank@gmail.com" },
{ name: "Jatinkumar Oza", affiliation: "Protera Technologies", email: "ozajatinkumar@gmail.com" },
{ name: "Jena Abraham", affiliation: "AMD", email: "reach.jabraham@gmail.com" },
{ name: "Jesus F. Cevallos M.", affiliation: "Università degli studi dell'Insubria", email: "jf.cevallosmoreno@uninsubria.it" },
{ name: "Jihan Zhang", affiliation: "The Chinese University of Hong Kong", email: "jhzhangcu@link.cuhk.edu.hk" },
{ name: "John Wesly Sajja", affiliation: "Deloitte Consulting", email: "sajjajohnwesly@gmail.com" },
{ name: "Juby Nedumthakidiyil Zacharias", affiliation: "Sams Club (Walmart)", email: "reachjubyzacharias@gmail.com" },
{ name: "Junaid Syed", affiliation: "Apple", email: "hijunaidsyed@gmail.com" },
{ name: "Jyotheeswara Reddy Gottam", affiliation: "Walmart Global Tech", email: "jyotheeswarareddygottam@gmail.com" },
{ name: "Kaarthikshankar Palraj", affiliation: "Dropbox", email: "kaarthikpalraj@gmail.com" },
{ name: "Karan Jain Singh", affiliation: "Apple", email: "reachkaranjain@gmail.com" },
{ name: "Karan Tejpal", affiliation: "Massachusetts Department of Public Health", email: "ktp1221995@gmail.com" },
{ name: "Karthikeyan Selvarajan", affiliation: "University of Illinois at Urbana Champaign", email: "karthik.selvarajan83@gmail.com" },
{ name: "Karthikram R M", affiliation: "SASTRA Deemed to be University", email: "karthikram@mba.sastra.edu" },
{ name: "Kavya Pathuri", affiliation: "Northern Trust", email: "kavya.pathuri.k@gmail.com" },
{ name: "Krishna Chaitanya Rao Kathala", affiliation: "University of Massachusetts Amherst", email: "kkathala@umass.edu" },
{ name: "Krishna Chaitanya Yarlagadda", affiliation: "Mercury Financial", email: "krishnac.yarlagadda@gmail.com" },
{ name: "Krishna Anumula", affiliation: "I have worked with leading global organizations such as LTIMindtree Limited, Herbalife, Fusion Plus Solutions Inc., CitiGroup", email: "anumulakrishnaa@gmail.com" },
{ name: "Krishna Gandhi", affiliation: "Independent Researcher", email: "gandhikrishna0404@gmail.com" },
{ name: "Kumar Kanti Ghosh", affiliation: "Apple Inc", email: "reachkumarghosh@gmail.com" },
{ name: "Lavanya Jacintha Victor", affiliation: "Ford Motor Company", email: "lavanyajacinthavictor@gmail.com" },
{ name: "Lavanya Gupta", affiliation: "JPMorgan Chase", email: "lavanya181194@gmail.com" },
{ name: "Laxman Doddipatla", affiliation: "PNC BANK", email: "dplaksh2014@gmail.com" },
{ name: "Lingareddy Alva", affiliation: "IT Spin Inc", email: "alvalingareddy@gmail.com" },
{ name: "Maheeza Bhamidipati", affiliation: "Fidelity Investments", email: "maheezabhamidipati@gmail.com" },
{ name: "Mahesh Ganji", affiliation: "PricewaterhouseCoopers LLP, USA", email: "mahesh.ganji@gmail.com" },
{ name: "Malar Mangai Kondappan", affiliation: "GM Financials", email: "malarmangai.kondappan@gmail.com" },
{ name: "Malathi Gundapuneni", affiliation: "Goldman Sachs", email: "reachmalathigundapuneni@gmail.com" },
{ name: "Mamatha Adinarayana, Swamy", affiliation: "Microsoft Corporation", email: "himamathaswamy@gmail.com" },
{ name: "Manas Sharma", affiliation: "Google Inc.", email: "manassharmaasu@gmail.com" },
{ name: "Manichandrabhooshan Sajjanapu", affiliation: "FINRA", email: "manichandra.sajjanapu@gmail.com" },
{ name: "Manishankar Janakaraj", affiliation: "Turo Inc.", email: "janakarajmanishankar@gmail.com" },
{ name: "Manivannan Ramar", affiliation: "MSG Entertainment Holdings, LLC", email: "manivannanramars@gmail.com" },
{ name: "Manoj Murali", affiliation: "Apple Inc.", email: "manojmurali0609@gmail.com" },
{ name: "Mathew Sebastian", affiliation: "Lucid Motors", email: "mathew.sebastian.net@gmail.com" },
{ name: "Mayank Rai", affiliation: "General Motors LLC, University Of California Berkeley", email: "reachmayankr@gmail.com" },
{ name: "Mohan Babu Talluri Durvasulu", affiliation: "ADP - Automatic Data processing", email: "reachmohanbabutalluri@gmail.com" },
{ name: "Mohan Krishna Bellamkonda", affiliation: "Tata Consultancy Services Ltd", email: "mohankrrishna@gmail.com" },
{ name: "Mrugendrasinh Laxmansinh Rahevar", affiliation: "Charotar University of Science and Technology0000-0002-0551-9229", email: "mrugendrarahevar.ce@charusat.ac.in" },
{ name: "Muruganantham Angamuthu", affiliation: "TTI Consumer Power Tools Inc.", email: "muruga7.angamuthu@gmail.com" },
{ name: "Muthuraj Ramalinga kumar", affiliation: "Workday INC", email: "muthurajramalingakumar@gmail.com" },
{ name: "Naga Sai Bandhavi Sakhamuri", affiliation: "solarwinds", email: "bandhavistar@gmail.com" },
{ name: "Nagaraju Velur", affiliation: "Wipro Ltd", email: "nagarajuvelur@gmail.com" },
{ name: "Nagarjuna Rao Dustakar", affiliation: "Meta Platforms Inc.", email: "nagarjuna.dstkr@gmail.com" },
{ name: "Narendra Kumar Reddy Choppa", affiliation: "The Mosaic Company", email: "narendrakchoppa@gmail.com" },
{ name: "Narendra Subbanarasimhaiah shashidhara", affiliation: "University of Pennsylvania (Alumnus)", email: "narendrashashidhara@gmail.com" },
{ name: "Naveen Kumar Pedada", affiliation: "COGNIZANT TECHNOLOGY SOLUTIONS US CORP", email: "naveenkumar.pedada1@gmail.com" },
{ name: "Nawazpasha Shaik", affiliation: "Humana Inc", email: "reachnawazshaik@gmail.com" },
{ name: "Nikitha Edulakanti", affiliation: "Fresenius medical care", email: "nedulakanti11@gmail.com" },
{ name: "Nilima James Rodrigues", affiliation: "Align Technology Inc", email: "writetonilimarodrigues@gmail.com" },
{ name: "Nitin Kumar", affiliation: "University of Illinois Urbana Champaign", email: "kumar.nitin0710@gmail.com" },
{ name: "Pankaj Verma", affiliation: "Independent researcher", email: "pankajverma02912@gmail.com" },
{ name: "Parul Purwar", affiliation: "IMC", email: "parulpurwar32@gmail.com" },
{ name: "Pradeep Kiran Veeravalli", affiliation: "Salesforce INC", email: "pradeepkiranvee@gmail.com" },
{ name: "Pradeep Karanam", affiliation: "Four Color Technologies", email: "pradeepkaranam.pk@gmail.com" },
{ name: "Prakash Manwani", affiliation: "San Jose State University", email: "reachpmanwani@gmail.com" },
{ name: "Pramod Sathyanarayana Rao", affiliation: "Broadcom", email: "pramodrao833@gmail.com" },
{ name: "Praveen Kumar Alam", affiliation: "Apple", email: "reachpraveenalam@gmail.com" },
{ name: "Praveen Kumar Guguloth", affiliation: "State University of New York at Binghamton, New York", email: "reachpraveengk@gmail.com" },
{ name: "Praveen Kumar Surabhi", affiliation: "KPK Technologies INC", email: "praveenstechie@gmail.com" },
{ name: "Prudhvi Raj Atluri", affiliation: "Quantiphi Inc", email: "prudhvirajatluri@gmail.com" },
{ name: "Puneet Pahuja", affiliation: "Accelitas", email: "puneet7498@gmail.com" },
{ name: "Pushap Goyal", affiliation: "Google", email: "pushapgoyal1@gmail.com" },
{ name: "Rahul Ameria", affiliation: "Meta Platforms Inc", email: "ameriarahul5@gmail.com" },
{ name: "Rahul Mahajan", affiliation: "Independent Researcher", email: "rpm.mahajan@gmail.com" },
{ name: "Rahul Singh", affiliation: "Amazon", email: "singlrah@amazon.com" },
{ name: "Raja Chattopadhyay", affiliation: "Capital One", email: "raja.chattopadhyay@gmail.com" },
{ name: "Rajendra Prasad Sola", affiliation: "Independent Researcher", email: "Rajendra.Prasad.Sola@gmail.com" },
{ name: "Rajesh Kumar Akkalaneni", affiliation: "Goldman Sachs", email: "rajesh.akkalaneni@gmail.com" },
{ name: "Rajesh Arsid", affiliation: "Edinburgh Napier University, Scotland, UK", email: "arsidrj@gmail.com" },
{ name: "Rakesh Maltumkar", affiliation: "Denken Solutions Inc", email: "rakesh.maltumkr@gmail.com" },
{ name: "Rakesh Rakesh S", affiliation: "Apple", email: "reachrsunki@gmail.com" },
{ name: "Rakshit Khare", affiliation: "Amazon Web Services", email: "reachrakskhare@gmail.com" },
{ name: "Ram Mohan Reddy Pothula", affiliation: "CVS Health", email: "pothularm@gmail.com" },
{ name: "Ramakrishna Ramadugu", affiliation: "Finastra Technologies", email: "ramakrishna.ramadugu@ieee.org" },
{ name: "Ramamohan Kummara", affiliation: "IIT Hyderabad", email: "emailramamohan@gmail.com" },
{ name: "Raman Vasikarla", affiliation: "Rivier University", email: "ramanvasikarla6@gmail.com" },
{ name: "Ramprasad Reddy Mittana", affiliation: "NSF INTERNATIONAL", email: "reachmittana@gmail.com" },
{ name: "Ramya Boorugula", affiliation: "Snap Inc", email: "boorugula.ram@gmail.com" },
{ name: "Rand Obeidat", affiliation: "Bowie State University", email: "robeidat@bowiestate.edu" },
{ name: "Ravi Kumar Kurapati", affiliation: "Home Depot Management Company,LLC", email: "ravikumar.kurapati2404@gmail.com" },
{ name: "Ravi Teja Avireneni", affiliation: "LACARE", email: "ravireneni@gmail.com" },
{ name: "Ravi Teja Balla", affiliation: "ABM INDUSTRIES INC.", email: "rtballa.mr@gmail.com" },
{ name: "Rohan Gopal Kulkarni", affiliation: "Meta", email: "rohan.kulkarni1998@gmail.com" },
{ name: "Rohit Taneja", affiliation: "PetSmart", email: "rohittaneja@gmail.com" },
{ name: "Rutvij Shah", affiliation: "Independent", email: "connect@rutvijshah.com" },
{ name: "Sachin Telalwar", affiliation: "Zocdoc", email: "sachintelalwar@gmail.com" },
{ name: "Sadia Afrin", affiliation: "University of Texas at San Antonio", email: "sadia.afrin2@my.utsa.edu" },
{ name: "Sagar Bharat Shah", affiliation: "University of Cincinnati", email: "sagarshah8087@gmail.com" },
{ name: "Sahil Yadav", affiliation: "Harvard University", email: "sahilyd@outlook.com" },
{ name: "Sai Krishna Gurram", affiliation: "Visa Inc.", email: "reachsaigurram@gmail.com" },
{ name: "Sai Ram Chappidi", affiliation: "Salesforce Inc", email: "sairamchappidi.src@gmail.com" },
{ name: "Sai Bhargav Musuluri", affiliation: "Avanasa IT Solutions LLC", email: "musuluri.saibhargav2@gmail.com" },
{ name: "Sampath Kumar Varanasi", affiliation: "Microsoft", email: "sampathvaranasi530@gmail.com" },
{ name: "Sanjeev Kumar Mourya", affiliation: "Bundelkhand Institute Of Engineering and Technology", email: "sankmourya@gmail.com" },
{ name: "Santosh Nakirikanti", affiliation: "waters corporation", email: "santoshnakirikanti@gmail.com" },
{ name: "Sasidhar Metla", affiliation: "IBM", email: "sasidhar.metla2@ibm.com" },
{ name: "Satish Kabade", affiliation: "IT company", email: "satishkabade25@gmail.com" },
{ name: "Seetaram Rao Rayarao", affiliation: "JP Morgan Chase", email: "seetaram.r@gmail.com" },
{ name: "Sesha Sai Ega", affiliation: "Amazon", email: "seshega@gmail.com" },
{ name: "Shahul Hameed Abbas", affiliation: "SRM University India", email: "connectshahula@gmail.com" },
{ name: "Shaileshbhai Revabhai Gothi", affiliation: "University of Florida", email: "shaileshrgothi@gmail.com" },
{ name: "Shashank Rudra", affiliation: "VF Corporation (VF Services LLC)", email: "shashank.rudra.professional@gmail.com" },
{ name: "Shatrughna Upadhyay", affiliation: "Intuit Inc", email: "reachshatrughna@gmail.com" },
{ name: "Shivam Shivam Aditya", affiliation: "Conga", email: "shivamaditya.v@gmail.com" },
{ name: "Shivaramakrishnan Kalpetta Subramaniam", affiliation: "Indian Institute of Management, Kozhikode", email: "shivasubramaniam.pm@gmail.com" },
{ name: "Shivendra Kumar", affiliation: "Amazon", email: "shivendra8949@gmail.com" },
{ name: "Shreyas Subhash Sawant", affiliation: "Workday", email: "shreyassubhashsawant@gmail.com" },
{ name: "Shrikanth Purushotham, Mahale", affiliation: "Georgia Institute of Technology", email: "shrikanth.mahale@gmail.com" },
{ name: "Shubham Gupta", affiliation: "Noblesoft Solutions Inc.", email: "shubhamgupta133@gmail.com" },
{ name: "Shubham S Beldar", affiliation: "Symbotic llc.", email: "beldarshubh@gmail.com" },
{ name: "Shubhra Naresh Mittal", affiliation: "Microsoft", email: "shubhra.goel@gmail.com" },
{ name: "Siddharth Gupta", affiliation: "Coupang", email: "reachsiddharthgupta.sg@gmail.com" },
{ name: "Siva Ramakrishna Reddy Venna", affiliation: "Circana LLC.", email: "vennasivaram@gmail.com" },
{ name: "Siva Sai Kumar Yachamaneni", affiliation: "Infosys Limited", email: "sivayachamaneni24@gmail.com" },
{ name: "Sivaprakash Sivanarasu", affiliation: "S&P GLOBAL", email: "reachsivanarasu@gmail.com" },
{ name: "Sivaprasad Yerneni khaga", affiliation: "Infoway Software", email: "MailSivaYerneni@gmail.com" },
{ name: "Sohag Maitra", affiliation: "Oklahoma State Univeristy", email: "sohagmaitra@gmail.com" },
{ name: "Solomon Raju Chigurupati", affiliation: "Silicon Valley University", email: "solomonrchigurupati@gmail.com" },
{ name: "Sonik Sikka", affiliation: "Sheppard Pratt", email: "reachsonik@gmail.com" },
{ name: "Sonika Arora", affiliation: "Salesforce", email: "sonika.arora@salesforce.com" },
{ name: "Sreelakshmi Somalraju", affiliation: "Plative Inc.", email: "sreelakshmisomal@gmail.com" },
{ name: "Sri Harsha Koneru", affiliation: "Infoway Software LLC", email: "harsha.srihk@gmail.com" },
{ name: "Srikanth Gurram", affiliation: "Salesforce Inc", email: "reachsrikanthgurram@gmail.com" },
{ name: "Srikanth Perla", affiliation: "Wilmington University", email: "reachsrikanthperla@gmail.com" },
{ name: "Srikar Kompella", affiliation: "Northern Illinois University", email: "reachsrikarkompella@gmail.com" },
{ name: "Srinivas Maddela", affiliation: "Wilmington University", email: "reachsrinivasms@gmail.com" },
{ name: "Srinivasan Pakkirisamy", affiliation: "SPL Consulting Inc", email: "srinipakkirisamy@gmail.com" },
{ name: "Sudheer Obbu", affiliation: "JPMorgan Chase", email: "mail2sudheerobbu@gmail.com" },
{ name: "Suresh Kotha Naga Venkata Hanuma", affiliation: "Molina healthcare", email: "sureshknvh@gmail.com" },
{ name: "Suresh Dameruppula", affiliation: "Mygoconsulting", email: "Suresh.d@mygoconsulting.com" },
{ name: "Suresh Varma Dendukuri", affiliation: "Tata Consultancy Services", email: "sureshvashishtad@gmail.com" },
{ name: "Surya Rao Rayarao", affiliation: "University of Texas at Austin", email: "suryarao.r@utexas.edu" },
{ name: "Swetha Priya Sathiyam", affiliation: "SDM Institute", email: "swethapsathiyam@gmail.com" },
{ name: "Tarun Chataraju", affiliation: "JPMorgan Chase & Co", email: "tchataraju@gmail.com" },
{ name: "Thilak Raj Surendra babu", affiliation: "Zscaler", email: "thilakraj.surendrababu@gmail.com" },
{ name: "Thomas Aerathu Mathew", affiliation: "Lululemon", email: "thomas.aerathumathew@gmail.com" },
{ name: "Tuhin Banerjee", affiliation: "Saviynt Inc.", email: "tuhinbanerj@gmail.com" },
{ name: "Tykea Khy", affiliation: "TK EXPRESS CO., LTD", email: "tykeakh@gmail.com" },
{ name: "Vaibhav Anil Vora", affiliation: "Amazon Web Services", email: "voravaibhavanil@gmail.com" },
{ name: "Vaishnav Yerram", affiliation: "KIK IT", email: "vaishnavy413@gmail.com" },
{ name: "Vamsi Praveen Karanam", affiliation: "Amazon", email: "vamsipraveenkaranam@gmail.com" },
{ name: "Vasu Sunil Kumar Gandhi", affiliation: "Aujas Cybersecurity", email: "reachvasug@gmail.com" },
{ name: "Vasuki Shankar", affiliation: "Nvidia Corporation", email: "vasukishankarb@gmail.com" },
{ name: "Venkata Kalyan Chakravarthy Mandavilli", affiliation: "ITEK Software LLC", email: "venkata.mandavilli@gmail.com" },
{ name: "Venkata Amarnath Rayudu Amisetty", affiliation: "SAP SuccessFactors", email: "amarnathgateway@gmail.com" },
{ name: "Venkata Satish Polu", affiliation: "The Andersons, Inc.", email: "venkatasatishp3@gmail.com" },
{ name: "Venkata Satya Sureshkumar Kondeti", affiliation: "T-Mobile USA Inc", email: "kondetivenkata.eee@gmail.com" },
{ name: "Venkateswarlu Boggavarapu", affiliation: "JPMorgan Chase", email: "mailtoboggavarapu@gmail.com" },
{ name: "Vignesh Kuppa Amarnath", affiliation: "MSRCOSMOS LLC", email: "vkuppaamarnath@gmail.com" },
{ name: "Vijaya Bhaskara Reddy Soperla", affiliation: "Intellibee inc", email: "vijayasoperla@gmail.com" },
{ name: "Vijaya Kumar Katta", affiliation: "Infinite Computer Solutions", email: "vijayakkatta@gmail.com" },
{ name: "Vilas Shewale", affiliation: "Energy Transfer", email: "vilasshewale33@gmail.com" },
{ name: "Vinay Sai Kumar Goud Gopigari", affiliation: "Phidimensions", email: "gopigari.vinaysai@gmail.com" },
{ name: "Vinay Siva Kumar Bhemireddy", affiliation: "ADT LLC", email: "vinayskb9@gmail.com" },
{ name: "Vinaya Surya", affiliation: "Nokia US", email: "reachvinayasurya@gmail.com" },
{ name: "Vishal Gangarapu", affiliation: "Mizuho Financial Group", email: "vishalgangarapu.vg@gmail.com" },
{ name: "Viswakanth Ankireddi", affiliation: "INTEL", email: "mail2viswakanth@gmail.com" },
{ name: "Vivek Krishna Choppa", affiliation: "National Institute of Technology, Rourkela", email: "vivekkrishnachoppa@gmail.com" },
{ name: "Vivek Sai Ramagiri", affiliation: "IBM", email: "viveksai30534@gmail.com" },
{ name: "Vivek Sharma", affiliation: "Amazon", email: "reach.vivekshrma@gmail.com" },
{ name: "Yashasvi Makin", affiliation: "Meta Platform Inc", email: "yashasvimakin@gmail.com" },
{ name: "Yerram Sridhar Reddy Yerram", affiliation: "PNC Bank", email: "sryerram2016@gmail.com" },
];



  return (
    <section className="py-16 bg-white overflow-x-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 transform ${
            inView || isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-2xl font-bold text-primary flex items-center">
                <Cpu className="w-6 h-6 mr-2" />
                International TPC
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
            {internationalTpcMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  inView || isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 20}ms` }}
              >
                <div className="border-t-4 border-primary"></div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{member.name}</h4>
                  <div className="flex items-start gap-2 mb-2">
                    <Building className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{member.affiliation}</p>
                  </div>
                  <div className="flex items-start gap-2">
                   
                  </div>
                </div>
                <div className="border-2 border-primary/10 absolute inset-0 rounded-xl pointer-events-none"></div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20"></div>
                <div className="absolute -right-1 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <noscript>
        <style>
          {`.opacity-0 { opacity: 1 !important; transform: none !important; }`}
        </style>
      </noscript>
    </section>
  )
}
