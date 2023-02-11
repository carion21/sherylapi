const express = require('express');
const { getAppName, getHashpass, get_date_now } = require('../../config/constante');
const router = express.Router();

const User = require('../../models/user');

const validator = require("email-validator");
const { compareWithBcrypt } = require('../../config/hashub');

router.get('/', async function (req, res, next) {
  // code principal ici
  res.redirect('/api/srv05/user/all');
});

router.get('/all', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    datas = await User.getAll()
    result.success = true
    result.data = datas
  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

router.post('/login', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    let body = req.body
    let email = body.email
    let motdepasse = body.motdepasse

    let msgerr = ""

    if (email && motdepasse) {
      if (validator.validate(email)) {
        let users = await User.getByOneColumn({
          column: "email",
          value: email
        })

        if (users.length == 1) {
          const user = users[0]
          if (user.etat == 1) {
            let verif = compareWithBcrypt(motdepasse, user.password)
            if (verif) {
              result.success = true
              result.data = users
            } else {
              msgerr = "Le mot de passe est incorrect"
            }
          } else {
            msgerr = "L'utilisateur n'est pas autorisé"
          }
        } else {
          msgerr = "Aucun utilisateur trouvé"
        }
      } else {
        msgerr = "L'email n'est pas valide"
      }
    } else {
      msgerr = "L'email et le mot de passe sont obligatoires"
    }

    if(msgerr) {
      result.message = msgerr
    }

  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

router.post('/register', async function (req, res, next) {
  // code principal ici
  let result = {
    success: false,
  }

  try {
    let body = req.body
    let nom = body.nom
    let prenom = body.prenom
    let telephone = body.telephone
    let email = body.email
    let motdepasse = body.motdepasse

    let msgerr = ""

    if (nom && prenom && telephone && email && motdepasse) {
      if (validator.validate(email)) {
        let users = await User.getByOneColumn({
          column: "email",
          value: email
        })

        if (users.length == 0) {
          let hashpass = getHashpass(motdepasse)
          let user = new User({
            first_name: nom,
            last_name: prenom,
            telephone: telephone,
            email: email,
            password: hashpass,
            etat: 1,
            created_at: get_date_now(),
            updated_at: get_date_now()
          })

          let rdata = await user.create()
          let id = rdata['id']
          if (id) {
            result.success = true
            result.data = rdata
          } else {
            msgerr = "Une erreur est survenue lors de l'enregistrement"
          }
        } else {
          msgerr = "L'email est déjà utilisé"
        }
      } else {
        msgerr = "L'email n'est pas valide"
      }
    } else {
      msgerr = "Tous les champs sont obligatoires"
    }

    if(msgerr) {
      result.message = msgerr
    }

  } catch (error) {
    result.message = error.message
  }

  res.json(result);
});

module.exports = router;
