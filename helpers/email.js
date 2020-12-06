const nodemailer = require('nodemailer');
const { Reservation } = require('../models/reservation');
const moment = require('moment')
    // moment.locale('id');

module.exports = async(reservation) => {
    let dataReservation = await Reservation
        .findById(reservation)
        .populate(['patient', 'animals'])
        .populate({
            path: "schedule",
            populate: ["clinic", "veterinary"]
        });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vetforpet07@gmail.com',
            pass: 'vet0720pet'
        }
    });

    let status = {};

    if (dataReservation.status === 'approved') {
        status.color = '#68a726'
        status.name = 'APPROVED'
    } else if (dataReservation.status === 'rejected') {
        status.color = '#be1f2f'
        status.name = 'REJECTED'
    } else if (dataReservation.status === 'pending') {
        status.color = '#e9d62f'
        status.name = 'WAITING'
    } else {
        status.color = '#0069d9'
        status.name = 'FINISHED'
    }

    console.log(dataReservation.patient.email)



    let animalString = "";
    (dataReservation.animals).forEach(animal => {
        animalString += `
          <tr>
            <th>${animal.name} - ${animal.type}</th>
          </tr>
        `
    });

    let mailOptions = {
        from: 'vetforpet07@gmail.com',
        to: dataReservation.patient.email,
        // to: 'vet.pet0720@gmail.com, daniel.mahardikay@gmail.com, aridea95@gmail.com', //dataReservation.schedule.patient.email,
        subject: 'Reservation Status',
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    <!--[if !mso]-->
    <!-- -->
    <link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet">
    <!-- <![endif]-->

    <title>Material Design for Bootstrap</title>

    <style type="text/css">
        body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            mso-margin-top-alt: 0px;
            mso-margin-bottom-alt: 0px;
            mso-padding-alt: 0px 0px 0px 0px;
        }
        
        p,
        h1,
        h2,
        h3,
        h4 {
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
        }
        
        span.preheader {
            display: none;
            font-size: 1px;
        }
        
        html {
            width: 100%;
        }
        
        table {
            font-size: 14px;
            border: 0;
        }
        /* ----------- responsivity ----------- */
        
        @media only screen and (max-width: 640px) {
            /*------ top header ------ */
            .main-header {
                font-size: 20px !important;
            }
            .main-section-header {
                font-size: 28px !important;
            }
            .show {
                display: block !important;
            }
            .hide {
                display: none !important;
            }
            .align-center {
                text-align: center !important;
            }
            .no-bg {
                background: none !important;
            }
            /*----- main image -------*/
            .main-image img {
                width: 440px !important;
                height: auto !important;
            }
            /* ====== divider ====== */
            .divider img {
                width: 440px !important;
            }
            /*-------- container --------*/
            .container590 {
                width: 440px !important;
            }
            .container580 {
                width: 400px !important;
            }
            .main-button {
                width: 220px !important;
            }
            /*-------- secions ----------*/
            .section-img img {
                width: 320px !important;
                height: auto !important;
            }
            .team-img img {
                width: 100% !important;
                height: auto !important;
            }
        }
        
        @media only screen and (max-width: 479px) {
            /*------ top header ------ */
            .main-header {
                font-size: 18px !important;
            }
            .main-section-header {
                font-size: 26px !important;
            }
            /* ====== divider ====== */
            .divider img {
                width: 280px !important;
            }
            /*-------- container --------*/
            .container590 {
                width: 280px !important;
            }
            .container590 {
                width: 280px !important;
            }
            .container580 {
                width: 260px !important;
            }
            /*-------- secions ----------*/
            .section-img img {
                width: 280px !important;
                height: auto !important;
            }
        }
    </style>
    <!-- [if gte mso 9]><style type=”text/css”>
                body {
                font-family: arial, sans-serif!important;
                }
                </style>
            <![endif]-->
</head>


<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <!-- pre-header -->
    <table style="display:none!important;">
        <tr>
            <td>
                <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                    Vet Reservation
                </div>
            </td>
        </tr>
    </table>
    <!-- pre-header end -->
    <!-- header -->
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        <tr>
            <td align="center">
                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">

                    <tr>
                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td align="center">
                            <table border="0" align="center" width="590px" cellpadding="0" cellspacing="0" class="container590">
                                <tr>
                                    <td align="center" style="flex-direction: row; font-family: 'Montserrat', sans-serif; background-color: #1a3150; font-size: 28px; color: white">Vet - Life for Pet</td>
                                </tr>
                                <tr>
                                    <td align="center" height="70" style="height:70px;">
                                        <a style="display: block; border-style: none !important; border: 0 !important;"><img border="0" style="width: 150px; height: 150px" src="https://cdn.discordapp.com/attachments/359923011106897922/770235048623865856/Group_7.png" alt="" /></a>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center">
                                        <hr>
                                        <table width="480" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
                                            <tr>
                                                <td width="120" align="center" style="font-size: 16px; font-family: 'Montserrat', sans-serif; line-height: 24px;">
                                                    <a style="color: #312c32; text-decoration: none;">Pet Care</a>
                                                </td>
                                                <td width="120" align="center" style="font-size: 16px; font-family: 'Montserrat', sans-serif; line-height: 24px;">
                                                    <a style="color: #312c32; text-decoration: none;">Book Veterinary</a>
                                                </td>
                                                <td width="120" align="center" style="font-size: 16px; font-family: 'Montserrat', sans-serif; line-height: 24px;">
                                                    <a style="color: #312c32; text-decoration: none;">Pet Medicine</a>
                                                </td>
                                                <td width="120" align="center" style="font-size: 16px; font-family: 'Montserrat', sans-serif; line-height: 24px;">
                                                    <a style="color: #312c32; text-decoration: none;">Pet Pick Up</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <hr>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- end header -->

    <!--  Body -->
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        <tr>
            <td align="center">
                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                    <tr>
                        <td>
                            <table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
                                <tr>
                                    <td align="center">
                                        <a style=" border-style: none !important; border: 0 !important;"><img src="https://cdn.discordapp.com/attachments/359923011106897922/770234082768322560/Component_10.png" style="display: block; width: 280px;" width="280" border="0" alt="" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                                </tr>
                            </table>

                            <table border="0" width="260" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">

                                <tr>
                                    <td align="left" style="color: #1a3150; font-size: 30px; font-family: 'Montserrat', sans-serif; letter-spacing: 3px; " class="align-center">
                                        Your Book Information
                                    </td>
                                </tr>

                                <tr>
                                    <td height="15" style="font-size: 12px; line-height: 12px;">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td align="left">
                                        <table border="0" align="left" cellpadding="0" cellspacing="0" class="container590">
                                            <tr>
                                                <td align="center">
                                                    <table align="center" width="40" border="0" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
                                                        <tr>
                                                            <td height="2" style="font-size: 2px; line-height: 2px;"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td height="15" style="font-size: 12px; line-height: 12px;">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td align="left" style="color: #1a3150;; font-size: 24px; font-family: 'Montserrat', sans-serif;" class="align-center">
                                        Hai <strong>${dataReservation.patient.name}</strong>, your reservation
                                    </td>
                                </tr>

                                <tr>
                                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td align="left">
                                        <table border="0" align="left" cellpadding="0" cellspacing="0" class="container590">
                                            <tr>
                                                <td align="center">
                                                    <table border="0" align="center" width="280" cellpadding="0" cellspacing="0" style="border: 2px solid #eeeeee; ">

                                                        <tr>
                                                            <td height="5" style="font-size: 5px; line-height: 5px;">&nbsp;</td>
                                                        </tr>

                                                        <tr>
                                                            <td align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                Date
                                                            </td>
                                                            <th align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                ${moment(dataReservation.date).format('dddd, Do MMMM yyyy')}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td height="5" style="font-size: 5px; line-height: 5px;">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                Hour
                                                            </td>
                                                            <th align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                ${moment(dataReservation.date).format('LT')}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td height="5" style="font-size: 5px; line-height: 5px;">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                Clinic
                                                            </td>
                                                            <th align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                ${dataReservation.schedule.clinic.name}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td height="5" style="font-size: 5px; line-height: 5px;">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                Veterinary
                                                            </td>
                                                            <th align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                ${dataReservation.schedule.veterinary.name}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td height="5" style="font-size: 5px; line-height: 5px;">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="baseline" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                Pets
                                                            </td>
                                                            <td align="left" style="color: #1a3150; font-size: 14px; font-family: 'Montserrat', sans-serif; line-height: 20px; padding-left: 5px;">
                                                                <table>
                                                                    ${animalString}
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="10" style="font-size: 5px; line-height: 10px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #1a3150; font-size: 24px; font-family: 'Montserrat', sans-serif; letter-spacing: 3px;">
                            Reservation Status :
                            <span style="font-weight: bold; color: ${status.color}">${status.name}</span>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" style="font-size: 5px; line-height: 20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #1a3150; font-size: 24px; font-family: 'Montserrat', sans-serif;">
                            <hr> Thank you for entrusting the health of your Pets to Vet
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
        </tr>
        
    </table>
    <!-- end section -->
</body>

</html>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            // console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
        }
    });
}
